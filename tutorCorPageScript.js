// Массив студентов
let students = [
    { name: "Thomas", grade: "3.3", comment: "Viele Fehler", file: "" },
    { name: "Andrew", grade: "2.7", comment: "Zweite Teil ist falsch", file: "" },
    { name: "Anna", grade: "-", comment: "", file: "" },
    { name: "Elisa", grade: "1.3", comment: "Gut gemacht!", file: "" }
];

let sortOrder = 'asc'; // Начальный порядок сортировки

// Функция для отображения студентов в таблице
function displayStudents(filterGrade = 'all') {
    const tableBody = document.querySelector('#studentsTable tbody');
    tableBody.innerHTML = '';

    // Фильтрация студентов по оценке
    let filteredStudents = students.filter(student => {
        if (filterGrade === 'no-grade') {
            return student.grade === '-';
        }
        if (filterGrade === 'all') {
            return true;
        }

        const grade = parseFloat(student.grade);
        if (filterGrade === '1-2') return grade >= 1.0 && grade <= 2.0;
        if (filterGrade === '2-3') return grade > 2.0 && grade <= 3.0;
        if (filterGrade === '3-4') return grade > 3.0 && grade <= 4.0;

        return false;
    });

    // Сортировка студентов
    filteredStudents.sort((a, b) => {
        const gradeA = a.grade === '-' ? -1 : parseFloat(a.grade); // "No grade" gets the lowest priority
        const gradeB = b.grade === '-' ? -1 : parseFloat(b.grade);

        if (sortOrder === 'asc') {
            return gradeA - gradeB; // Ascending order
        } else {
            return gradeB - gradeA; // Descending order
        }
    });

    // Отображение студентов в таблице
    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td><input type="number" value="${student.grade}" onchange="updateGrade(${index}, event)"></td>
            <td><input type="text" value="${student.comment}" onchange="updateComment(${index}, event)"></td>
            <td><input type="checkbox" class="selectStudent" data-index="${index}"></td>
        `;
        tableBody.appendChild(row);
    });
}

// Обработчики изменений
function updateGrade(index, event) {
    students[index].grade = event.target.value;
    displayStudents(document.getElementById('gradeFilter').value); // обновление после изменения
}

function updateComment(index, event) {
    students[index].comment = event.target.value;
}

// Функция для фильтрации студентов по оценке
function filterByGrade() {
    const filterValue = document.getElementById('gradeFilter').value;
    displayStudents(filterValue);
}

// Функция для выбора всех студентов
document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.selectStudent');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

// Сохранение данных (логика заглушки)
document.getElementById('saveBtn').addEventListener('click', function() {
    alert('Data Saved!');
    // Можно добавить сохранение данных в localStorage или отправку на сервер
});

// Кнопка для скачивания выбранных файлов
document.getElementById('downloadBtn').addEventListener('click', function() {
    const selectedStudents = Array.from(document.querySelectorAll('.selectStudent:checked')).map(checkbox => {
        const index = checkbox.getAttribute('data-index');
        return students[index];
    });

    if (selectedStudents.length > 0) {
        alert('Download initiated for ' + selectedStudents.map(s => s.name).join(', '));
    } else {
        alert('No students selected!');
    }
});

// Перетаскивание файлов
const dropzone = document.getElementById('dropzone');
dropzone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropzone.addEventListener('drop', function(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        alert('Files dropped!');
        // Можете тут реализовать обработку файлов
    }
});

// Добавим обработчик для сортировки по оценке
document.getElementById('gradeHeader').addEventListener('click', function() {
    // Переключаем порядок сортировки
    sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    displayStudents(document.getElementById('gradeFilter').value); // Обновление таблицы после изменения порядка сортировки
});

// Инициализация таблицы
displayStudents();
