const addButton = document.getElementById('add-task')
let counter = 1
let tasksData = {task: [], id: 0}


function addLine (){
    const mainTable = document.querySelector(".main-table tbody")
    const newRow = document.createElement('tr')
    newRow.id = 'row-' + counter
    newRow.innerHTML = `
        <td class="exe">
            <input class="exe_input" type="text" placeholder="Название упражнения">
        </td>
        <td class="counter">
            <input type="text" class="count">/<input type="text" class="countAll">
        </td>
        <td>
            <input type="checkbox" class="check">
        </td>
        <td>
            <button class="save-task" type="submit">Save</button>
        </td>
        <td>
            <button class="delete-task">-</button>
        </td>
    `
    mainTable.appendChild(newRow)
    return newRow
}

function deleteTask (btn, row) {
    btn.addEventListener('click', function() {
        row.remove();
    })
}

function validateCount (newRow, saveButton, countInput, countAllInput, checkbox) {
    function validateInputs(){
        if (countAllInput.value === "") {
            countInput.disabled = true;
        } else {
            countInput.disabled = false;
        }
        if((countInput.value !== "" && countAllInput.value !== "") 
            && (isNaN(countInput.value) === true || isNaN(countAllInput.value) === true)){
        countInput.classList.add('main-table-uncorrect')
        countAllInput.classList.add('main-table-uncorrect'); } 
        else{
            countInput.classList.remove('main-table-uncorrect')
            countAllInput.classList.remove('main-table-uncorrect');
        }
    }
    countAllInput.addEventListener('input', validateInputs);
    countInput.addEventListener('input', function(){
        validateInputs()
        if(parseInt(countInput.value) >= parseInt(countAllInput.value)){
            checkbox.checked = true
            newRow.classList.add('main-table-active')
            saveButton.textContent = 'Edit'
            countInput.disabled = true
        } else checkbox.checked = false
    })
    validateInputs()
}

function btnEditOrSave (saveButton, inputs, newRow){
    saveButton.addEventListener('click', function(){
        const isSaved = saveButton.textContent === 'Edit'
        if (isSaved) {
            inputs.forEach(input => {
                input.readOnly = false
                input.disabled = false
            })
            saveButton.textContent = 'Save'
            newRow.classList.remove('main-table-active')
        } else {
            inputs.forEach(input => {
                input.readOnly = true
                if (input.type === 'checkbox') {
                    input.disabled = true
                }
            })
            saveButton.textContent = 'Edit'
            newRow.classList.add('main-table-active')
        }
    })
}

function rowFunc (row) {
    const countInput = row.querySelector('.count')
    const countAllInput = row.querySelector('.countAll')
    const checkbox = row.querySelector('.check')
    const minusBtn = row.querySelector('.delete-task')
    const saveButton = row.querySelector('.save-task')
    const inputs = row.querySelectorAll('input')

    deleteTask(minusBtn, row)
    
    btnEditOrSave(saveButton, inputs, row)

    validateCount(row, saveButton, countInput, countAllInput, checkbox)
}

addButton.addEventListener('click', function(){

    const newRow = addLine() 
    counter++
    rowFunc(newRow)

})

function saveToLocalStorage(){
    const tasks = []

    document.querySelectorAll('.main-table tr').forEach(row => {
        const task = {
            id: row.id,
            taskName: row.querySelector('.exe_input').value,
            count: row.querySelector('.count').value,
            countAll: row.querySelector('.countAll').value,
            completed: row.querySelector('.check').checked,
            isSaved: row.querySelector('.save-task').textContent === 'Edit'
        }
        tasks.push(task)
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('taskCounter', counter)
}