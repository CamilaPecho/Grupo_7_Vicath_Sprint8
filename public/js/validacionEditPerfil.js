//Capturando elementos ๐คฃ
let namee = document.querySelector('#nombre')
let lastName = document.querySelector('#apellido')
let phoneNumber = document.querySelector('#telefono')
let formularioEditPerfil = document.querySelector('#formularioEditPerfil')
let erroresGeneralFormulario = document.querySelector('#erroresGeneral')
let listaErrores = document.querySelector('#erroresListaGeneral')

//Capturando elementos ERRORES ๐
let nameError = document.querySelector('#nameError')
let lastNameError = document.querySelector('#lastNameError')
let phoneNumberError = document.querySelector('#phoneNumberError')
let formularioError = document.querySelector("#formError")

//Objeto literal contenedor de errores
let errors = {}

//Estilo de errores por defecto ๐
let bordeColor = '-4px 4px 2px #ed9d9d'
let transicion = "0.5s ease all"
let colorLetraError = "black"

//Asignando oyentes a los elementos ๐
namee.addEventListener("blur", nameValidator)
lastName.addEventListener("blur", lastNameValidator)
phoneNumber.addEventListener("blur", phoneNumberValidator)

//Asignando oyente al formulario general
formularioEditPerfil.addEventListener("submit", function(event)
{
    let listaErrores = document.querySelector('#erroresListaGeneral')
    if(Object.keys(errors).length >=1)
    {
        event.preventDefault()
        formularioError.innerHTML = "Fijate los errores de los campos"
            formularioError.classList.add('cambiando');
    }
    else{
        if(namee.value.length==0 || lastName.value.length==0 || phoneNumber.value.length==0)
        {
            event.preventDefault()
            console.log("Ade")
            formularioError.innerHTML = "Ningรบn campo debe quedar vacio"
            formularioError.classList.add('cambiando');
        }
        else{
            if(namee.value.length == 0)
            {
                event.preventDefault()
                console.log("funciona nombre")
                formularioError.innerHTML = "Ingrese el nombre"
                formularioError.classList.add('cambiando')
                
            }
            if(lastName.value.length == 0)
            {
                event.preventDefault()
                console.log("funciona apellido")
                formularioError.innerHTML = "Ingrese el apellido"
                formularioError.classList.add('cambiando')
            }
            if(phoneNumber.value.length == 0)
            {
                event.preventDefault()
                console.log("funciona nro")
                formularioError.innerHTML = "Ingrese el tรฉlefono"
                formularioError.classList.add('cambiando')
            }
            else{
                formularioError.innerHTML = ""
                formularioError.classList.remove('cambiando');
                formulario.submit()
            }
        }
    }
})


//Funciones de validacion papaaa ๐

function validatorGeneric(input, divError)
{
        input.style.boxShadow = bordeColor
        input.style.transition += transicion
        input.style.color += colorLetraError
        divError.classList.add('cambiando');
}

function removiendoCambiosGeneric(input, divError)
{
    divError.innerHTML = ""
    input.style.boxShadow = ""
    input.style.transition = ""
    input.style.color = ""
    divError.classList.remove('cambiando');
}

function nameValidator() {
    if(namee.value.length == 0)
    {
        let error = "El nombre no puede quedar vacio"
        errors.namee = error
        nameError.innerHTML = error
        validatorGeneric(namee, nameError)
    }
    else if(namee.value.length < 2)
    {
        let error = "El nombre debe tener al menos 2 caracteres"
        errors.namee = error
        nameError.innerHTML = error
        validatorGeneric(namee, nameError)
    }
    else
    {
        if(!validator.isAlpha(namee.value))
        {
            let error = "El nombre solo puede contener letras,corregilo por favor."
            errors.namee = error
            nameError.innerHTML = error
            validatorGeneric(namee, nameError)
        }
        else{
            delete errors.namee;
            removiendoCambiosGeneric(namee, nameError)
        }
    }
}

function lastNameValidator() {
    if(lastName.value.length == 0)
    {
        let error = "El apellido no puede quedar vacio"
        errors.lastName = error
        lastNameError.innerHTML = error
        validatorGeneric(lastName, lastNameError)
    }
    else if(lastName.value.length < 2)
    {
        let error = "El apellido debe tener al menos 2 caracteres"
        errors.lastName = error
        lastNameError.innerHTML = error
        validatorGeneric(lastName, lastNameError)
    }
    else
    {
        if(!validator.isAlpha(lastName.value))
        {
            let error = "El apellido solo puede contener letras, corregilo por favor."
            errors.lastName = error
            lastNameError.innerHTML = error
            validatorGeneric(lastName, lastNameError)
        }
        else{
            delete errors.lastName;
            removiendoCambiosGeneric(lastName, lastNameError)
        }
    }
}

function phoneNumberValidator() {
    if(phoneNumber.value.length == 0)
    {
        let error = "El telรฉfono no puede quedar vacio"
        errors.phoneNumber = error
        phoneNumberError.innerHTML = error
        validatorGeneric(phoneNumber, phoneNumberError)
    }
    else if(phoneNumber.value.length < 10)
    {
        let error = "El telรฉfono debe tener al menos 10 caracteres, corregilo por favor"
        errors.phoneNumber = error
        phoneNumberError.innerHTML = error
        validatorGeneric(phoneNumber, phoneNumberError)
    }
    else
    {
        if(!validator.isNumeric (phoneNumber.value))
        {
            let error = "El telรฉfono solo puede contener nรบmeros, corregilo por favor."
            errors.phoneNumber = error
            phoneNumberError.innerHTML = error
            validatorGeneric(phoneNumber, phoneNumberError)
        }
        else{
            delete errors.phoneNumber;
            removiendoCambiosGeneric(phoneNumber, phoneNumberError)
        }
    }
}