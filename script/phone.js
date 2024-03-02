const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{
    // console.log(phones);
     // 1. set by id ***
    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards 
    phoneContainer.textContent = ''; 

    //display show  all the button if there are more then 12  phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{ 
        showAllContainer.classList.add('hidden');
    }
    // console.log('show all', isShowAll );
    //display only first 12 phones if not show All
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }


    phones.forEach(phone =>{
        console.log(phone);
        // 2. create a div ***
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`;
         // 3. set inner HTML ***
        phoneCard.innerHTML = ` <figure>
        <img
          src="${phone.image}"
          alt="Shoes"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${phone.phone_name
        }</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
          <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
        </div>
      </div>
        ` 
        //  // 4. Append child ***
        phoneContainer.appendChild(phoneCard);

    })
    // hide loading spinner 
    toggleLoadingSpinner(false);

}

const handleShowDetail = async (id) =>{
    console.log('click show details' , id);
    //load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;
    //call function***
    showPhoneDetails(phone);

}

const showPhoneDetails = (phone) =>{
    console.log(phone)

    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    //show the modal
    show_derails_modal.showModal()
}

//*** handel search button */
const handleSearch = (isShowAll)=>{

    // console.log('search handel')
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }

}
 //handel show all 
 const handleShowAll = () =>{
    handleSearch = (true)

 }

// loadPhone();