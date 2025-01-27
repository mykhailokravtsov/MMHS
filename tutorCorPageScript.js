// JavaScript Code with Cancel Upload Feature

let students = [
    { name: "Thomas", grade: "3.3", comment: "Viele Fehler", index: 0, file: "Thomas.pdf" },
    { name: "Andrew", grade: "2.7", comment: "Zweite Teil ist falsch", index: 1, file: "Andrew.pdf" },
    { name: "Anna", grade: "-", comment: "", index: 2, file: "Anna.pdf" },
    { name: "Elisa", grade: "1.3", comment: "Gut gemacht!", index: 3, file: "Elisa.pdf" }
];

let sortOrder = 'asc'; 

function displayStudents(filterGrade = 'all') {
    const tableBody = document.querySelector('#studentsTable tbody');
    tableBody.innerHTML = '';

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

    filteredStudents.sort((a, b) => {
        const gradeA = a.grade === '-' ? -1 : parseFloat(a.grade); 
        const gradeB = b.grade === '-' ? -1 : parseFloat(b.grade);

        if (sortOrder === 'asc') {
            return gradeA - gradeB; 
        } else {
            return gradeB - gradeA; 
        }
    });

    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td><input type="text" value="${student.grade}" onchange="updateGrade(${student.index}, event)"></td>
            <td><input type="text" value="${student.comment}" onchange="updateComment(${student.index}, event)"></td>
            <td><input type="checkbox" class="selectStudent" data-index="${index}"></td>
        `;
        tableBody.appendChild(row);
    });
}

function updateGrade(index, event) {
    if(event.target.value > 0){
        students[index].grade = event.target.value;
        displayStudents(document.getElementById('gradeFilter').value); 
    } else {
        alert('Grade must be greater or equal to 0');
        displayStudents(document.getElementById('gradeFilter').value); 
    }
}

function updateComment(index, event) {
    students[index].comment = event.target.value;
}

function filterByGrade() {
    const filterValue = document.getElementById('gradeFilter').value;
    displayStudents(filterValue);
}

document.getElementById('selectAll').addEventListener('change', function() {
    const checkboxes = document.querySelectorAll('.selectStudent');
    checkboxes.forEach(checkbox => checkbox.checked = this.checked);
});

document.getElementById('saveBtn').addEventListener('click', function() {
    alert('Data Saved!');
});

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

const dropzone = document.getElementById('dropzone');
const uploadedFilesContainer = document.getElementById('fileList');
const cancelUploadButton = document.createElement('button');
cancelUploadButton.className = 'delete-btn';
cancelUploadButton.textContent = 'Cancel Upload';

cancelUploadButton.addEventListener('click', function() {
    uploadedFilesContainer.innerHTML = '';
    alert('Uploaded files cleared.');
});

document.querySelector('.file-display').appendChild(cancelUploadButton);

dropzone.addEventListener('dragover', function(event) {
    event.preventDefault();
});

dropzone.addEventListener('drop', function(event) {
    event.preventDefault();

    const files = event.dataTransfer.files;

    Array.from(files).forEach(file => {
        let matched = false;

        students.forEach(student => {
            if (file.name === student.file) {
                alert(`File ${file.name} matched with ${student.name}.`);
                matched = true;

                const fileElement = document.createElement('li');
                fileElement.textContent = `Matched file: ${file.name} (Student: ${student.name})`;
                uploadedFilesContainer.appendChild(fileElement);
            }
        });

        if (!matched) { 
            alert(`No matches for ${file.name}`);
        }
    });
});

displayStudents();

function goBack() {
    window.history.back();
}
