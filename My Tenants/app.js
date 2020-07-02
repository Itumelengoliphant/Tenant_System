class Person {
    constructor(title,firstName,lastName,id,address,phone){
        this.title = title;
        this.firstName = firstName;
        this.lastName = lastName;
        this.id = id;
        this.address = address;
        this.phone = phone;
    }
}

class UI{

    static displayPerson(){
       /* const storedPerson = [
            {
                title : 'Mr',
                firstName : 'Simphiwe',
                lastName : 'Tshabalala',
                id : '9808015272087',
                address : 'Jozi Street',
                phone : '10111'

            },

            {
                title : 'Mr',
                firstName : 'Simphiwe',
                lastName :'Tshabalala',
                id : '9808015272087',
                address : 'Jozi Street',
                phone : '10111'
            }
        ]; */

        const persons = Store.getPerson();

        persons.forEach((ten) => UI.addPerson(ten));
    }

    static addPerson(ten){
        
        const list = document.querySelector('#tenant-list');

        const row = document.createElement('tr');
        row.innerHTML = `

        <td>${ten.title}</td>
        <td>${ten.firstName}</td>
        <td>${ten.lastName}</td>
        <td>${ten.id}</td>
        <td>${ten.address}</td>
        <td>${ten.phone}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>

        `;

        list.appendChild(row);

    }
    
    static deletePerson(el){
        
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,className){

        const div = document.createElement('div');
        div.className =`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#person-form');
        container.insertBefore(div,form);

        setTimeout(()=> document.querySelector('.alert').remove(),3000);

    }

    
    static clearFields(){

       document.querySelector('#title').value = '';
       document.querySelector('#first-name').value= '';
       document.querySelector('#last-name').value= '';
       document.querySelector('#id-number').value= '';
       document.querySelector('#address').value= '';
       document.querySelector('#phone').value= '';
   }
}

document.addEventListener('DOMContentLoaded', UI.displayPerson);

document.querySelector('#person-form').addEventListener('submit', (e) =>
 {

    e.preventDefault();


    const title = document.querySelector('#title').value;
    const name = document.querySelector('#first-name').value;
    const surname = document.querySelector('#last-name').value;
    const id = document.querySelector('#id-number').value;
    const address = document.querySelector('#address').value;
    const phone = document.querySelector('#phone').value;

    if(title===''|| name===''|| surname===''|| address===''|| phone===''|| id===''){

        UI.showAlert('Error: Please enter all field(s)!','danger')

    }else{

    const newPerson = new Person(title,name,surname,id,address,phone);
    
    UI.addPerson(newPerson);

    UI.showAlert('Tenant successfully added','success');

    Store.addPerson(newPerson);

    UI.clearFields();

    }

    
});


document.querySelector('#tenant-list').addEventListener('click', (e) =>
{
    UI.deletePerson(e.target);

    var personRemoval = e.target.parentElement.
                     previousElementSibling.
                     previousElementSibling.
                     previousElementSibling.
                     textContent;

    Store.removePerson(personRemoval)

    UI.showAlert('Tenant successfully removed','success');
});


class Store{

    static getPerson(){

        let aPerson;

        if(localStorage.getItem('tenant')===null){

            aPerson = [];

        }else{

            aPerson = JSON.parse(localStorage.getItem('tenant'));
        }

        return aPerson;
        
    }

    static addPerson(p1){

        const newP = Store.getPerson();

        newP.push(p1);

        localStorage.setItem('tenant', JSON.stringify(newP));
    }

    static removePerson(id){

        const p2 = Store.getPerson();

        p2.forEach((person, index) => {
            if(person.id===id){
                p2.splice(index,1);
            }
        });

        localStorage.setItem('tenant',JSON.stringify(p2));
    }
}
