document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const addStudentModal = document.getElementById('addStudentModal');
    const closeModal = document.querySelector('.close');
    const addStudentForm = document.getElementById('addStudentForm');
    const studentTableBody = document.getElementById('studentTableBody');

    // Mock data for dropped out students (you should replace this with actual data)
    const droppedOutStudents = [
        { name: 'John Doe', school: 'john@example.com', studentID: '1234567890', phone: 123, classes: 'Sample District', aadhar: 123456 ,address:"pune",reason:"Personal"},
        // Add more students as needed
    ];

    // Function to display dropped out students in the table
    const displayStudents = () => {
        studentTableBody.innerHTML = ''; // Clear existing data

        droppedOutStudents.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.school}</td>
                <td>${student.studentID}</td>
                <td>${student.phone}</td>
                <td>${student.classes}</td>
                <td>${student.aadhar}</td>
                <td>${student.address}</td>
                <td>${student.reason}</td>
            `;
            studentTableBody.appendChild(row);
        });
    };

    // Show the modal when "Add Dropped Out Student" button is clicked
    addStudentBtn.addEventListener('click', () => {
        addStudentModal.style.display = 'block';
    });

    // Close the modal when the close button is clicked
    closeModal.addEventListener('click', () => {
        addStudentModal.style.display = 'none';
    });

    // Close the modal when clicking outside the modal
    window.addEventListener('click', (event) => {
        if (event.target === addStudentModal) {
            addStudentModal.style.display = 'none';
        }
    });

    // Handle form submission to add a new dropped out student
 // Handle form submission to add a new dropped out student
addStudentForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Get form data
    const name = document.getElementById('name').value;
    const school = document.getElementById('school').value;
    const studentID = document.getElementById('studentID').value;
    const phone = document.getElementById('phone').value;
    const classes = document.getElementById('classes').value;
    const aadhar = document.getElementById('aadhar').value;
    const address = document.getElementById('address').value;
    const reason = document.getElementById('reason').value;

    // Validate form data (you can add more validation as needed)

    try {
        // Send a POST request to the backend endpoint
        const response = await fetch('/addDroppedOutStudent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, school, studentID, phone, classes,aadhar, address, reason }),
        });

        if (response.ok) {
            // Handle success
            console.log('Student added successfully');
        } else {
            // Handle error
            console.error('Failed to add student:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }

    // Display the updated list of students
    displayStudents();

    // Close the modal
    addStudentModal.style.display = 'none';

    // Clear the form fields
    addStudentForm.reset();
});


    // Display initial dropped out students
    displayStudents();
});
