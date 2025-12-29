const API_URL = "http://localhost:8081/employees";

document.addEventListener("DOMContentLoaded", loadEmployees);

document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const id = document.getElementById("employeeId").value;
    const name = document.getElementById("name").value;
    const department = document.getElementById("department").value;

    const employee = { name, department };

    if (id) {
        // UPDATE
        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(resetForm);
    } else {
        // CREATE
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        }).then(resetForm);
    }
});

function loadEmployees() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            let html = `
                <table class="table table-bordered table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach(emp => {
                html += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.department}</td>
                        <td>
                            <button class="btn btn-sm btn-warning me-2"
                                onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.department}')">
                                Edit
                            </button>
                            <button class="btn btn-sm btn-danger"
                                onclick="deleteEmployee(${emp.id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;
            });

            html += "</tbody></table>";
            document.getElementById("employeeList").innerHTML = html;
        });
}

function editEmployee(id, name, department) {
    document.getElementById("employeeId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("department").value = department;

    document.getElementById("formTitle").innerText = "Edit Employee";
    document.getElementById("submitBtn").innerText = "Update Employee";
    document.getElementById("cancelBtn").classList.remove("d-none");
}

function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(loadEmployees);
}

function resetForm() {
    document.getElementById("employeeForm").reset();
    document.getElementById("employeeId").value = "";

    document.getElementById("formTitle").innerText = "Add New Employee";
    document.getElementById("submitBtn").innerText = "Add Employee";
    document.getElementById("cancelBtn").classList.add("d-none");

    loadEmployees();
}

document.getElementById("cancelBtn").addEventListener("click", resetForm);
