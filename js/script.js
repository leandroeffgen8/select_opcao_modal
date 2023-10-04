const containerSelect = document.querySelector('.container-select > div');
const selects = document.querySelectorAll('.container-select select');
const marca = document.querySelector('#marca');

const modal = document.querySelector('.modal');
const containerModal = document.querySelector('.container-modal');
const gridModal = document.querySelector('.grid-brands');
const buttonSelect = document.querySelector('.selectedItem');
const close = document.querySelector('.close');

window.addEventListener('DOMContentLoaded', () => {

    selects.forEach(select => {
        const option = document.createElement('option');
        option.value = '';
        option.setAttribute('selected', true);
        option.textContent = 'Selecione uma opção';
        select.insertBefore(option, select.firstChild);
    });

    for( let i = 1; i < selects.length; i++ ){
        selects[i].disabled = true;

        for( let x = 1; x < selects[i].length; x++ ){
            const text = selects[i].options[x].textContent;
            const valueText = text.split('|')[1];
            selects[i].options[x].textContent = valueText
        }
    }

});

const openModal = () => {
    modal.classList.remove('hide');
}

const closeModal = () => {
    modal.classList.add('hide');
}

const toggleButtons = () => {
    const buttons = document.querySelectorAll('.list-brands');
    for( let i = 0; i < buttons.length; i++ ){
        buttons[i].disabled = !buttons[i].disabled;
    }
}

const selectedBrands = (e) => {
    const button = e.target;
    toggleButtons();
    button.disabled = false;
}

const getBrands = (values) => {
    const buttons = document.createElement('option');
    buttons.classList.add('list-brands');

    buttons.innerHTML = `${values}`;

    if( values !== '' ){
        gridModal.appendChild(buttons);
        gridModal.addEventListener('click', selectedBrands)
    }

}

const brands = () => {
    openModal();
    for( let i = 0; i < marca.length; i++ ){
        const values = marca[i].value;
        getBrands(values);
    }
}

const clearBrands = () => {
    gridModal.innerHTML = '';
}

const getSelectBrands = (values) => {
    
    if( marca.values !== '' ){
        
        for( let x = 1; x < selects.length; x++ ){
            selects[x].disabled = false;

            for( let w = 1; w < selects[x].length; w++){
                const text = selects[x].options[w].value;
                const valueText = text.split('|')[0];
                
                if( values === valueText ){
                    selects[x].selectedIndex = 0;
                    selects[x].options[w].style.display = 'block'
                }else{
                    selects[x].options[w].style.display = 'none'
                }
            }
        }

    }else{
        for( let i = 1; i < selects.length; i++ ){
            selects[i].value = '';
            selects[i].disabled = true;
        } 
    }

}

const selectBrands = () => {
    const buttons = document.querySelectorAll('.list-brands');

    buttons.forEach(button => {
        if( button.disabled !== true ){
            const values = button.textContent;
            marca.value = values;
            debugger
            getSelectBrands(values);
            clearBrands();
            closeModal();
        }
    });

}

buttonSelect.addEventListener('click', selectBrands)
containerSelect.addEventListener('click', brands);