// fetching data from API
const loadItems = async(dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data.tools);
    displayItems(data.data.tools, dataLimit);
}
const dataArray = loadItems(12);
// Adding cards
const displayItems = (items, dataLimit) =>{
    const aiContainer = document.getElementById('ai-container');
    aiContainer.textContent = '';
    // display 6 items only 
    const showAll = document.getElementById('show-all');
    if(dataLimit && items.length > 6) {
        items = items.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    
    // display all items
    items.forEach(aiItem =>{
        const itemDiv  = document.createElement('div');
        itemDiv.classList.add('col');
        itemDiv.innerHTML = `
        <div class="card p-4">
            <img src="${aiItem.image}" class="card-img-top" alt="..." width="437px" height="300px">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${aiItem.features[0] ? aiItem.features[0] : 'Not Available'}</li>
                    <li>${aiItem.features[1] ? aiItem.features[1] : 'Not Available'}</li>
                    <li>${aiItem.features[2] ? aiItem.features[2] : 'Not Available'}</li>
                </ol>
                <h5 class="border-top pt-4">${aiItem.name}</h5>
                <div class="d-flex justify-content-between">
                    <div class="d-flex">
                        <i class="fa-regular fa-calendar-days pt-1"></i>
                        <p class="ps-2">${aiItem.published_in}</p>
                    </div>
                    <button onclick="loadAIDetails('${aiItem.id}')" href="#" class="btn btn-light" data-bs-toggle="modal" data-bs-target="#aiDetailModal"><i class="fa-solid fa-arrow-right" style="color:red;"></i></button>
                </div>
                
            </div>
        </div>
        `;
        aiContainer.appendChild(itemDiv);
    });
    toggleSpinner(false);
}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    loadItems(dataLimit);
}

// Loading/Spinner portion 
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

// Showing All Items 
document.getElementById('btn-show-all').addEventListener('click', function(){
    toggleSpinner(true);
    processSearch();
});

// Sorting By Date 
document.getElementById('btn-sort').addEventListener('click', function(){
    dataArray.sort((a,b)=>
    new Date(a.published_in) - new Date(b.published_in));
    console.log(dataArray);
});

// Complete Modal Portion 
const loadAIDetails = async(id) =>{
    const url =`https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAIDetails(data.data);
}

const displayAIDetails = item =>{
    console.log(item);
    const modalTitle = document.getElementById('aiDetailModalLabel');
    modalTitle.innerText = item.tool_name;
    const aiDetails = document.getElementById('ai-details');
    aiDetails.textContent = '';
    const uniDiv  = document.createElement('div');
    uniDiv.innerHTML = `
    <div class="container-fluid">
        <div class="row g-2">
                <div class="col-sm-12 col-md-6 border border-danger rounded p-3" style="background-color:rgba(235, 87, 87, 0.05);">
                    <p class="fw-bolder">${item.description ? item.description : 'Not Available Right Now'}</p>
                    <div class="d-flex">
                        <div class="bg-light rounded text-center align-middle p-2 me-2">
                            <h5 style="font-size: 15px; color:green; text-align:center;">${item.pricing[0].price ? item.pricing[0].price : 'Free'}</h5>
                            <h5 style="font-size: 15px; color:green; text-align:center;">${item.pricing[0].plan ? item.pricing[0].plan : 'Of Cost'}</h5>
                        </div>
                        <div class="bg-light rounded text-center align-middle p-2 me-2">
                            <h5 style="font-size: 15px; color:orange; text-align:center;">${item.pricing[1].price ? item.pricing[1].price : 'Free'}</h5>
                            <h5 style="font-size: 15px; color:orange; text-align:center;">${item.pricing[1].plan ? item.pricing[1].plan : 'Pro'}</h5>
                        </div>
                        <div class="bg-light rounded text-center align-middle p-2 me-2">
                            <h5 style="font-size: 15px; color:red; text-align:center;">${item.pricing[2].price ? item.pricing[2].price : 'Contact Us'}</h5>
                            <h5 style="font-size: 15px; color:red; text-align:center;">${item.pricing[2].plan ? item.pricing[2].plan : 'For further queries'}</h5>
                        </div>
                    </div>
                    <div class="d-flex">
                        <div>
                            <h5>Features</h5>
                            <ul>
                                <li>${item.features[1].feature_name ? item.features[1].feature_name : 'Data Not Found'}</li>
                                <li>${item.features[2].feature_name ? item.features[2].feature_name : 'Data Not Found'}</li>
                                <li>${item.features[3].feature_name ? item.features[3].feature_name : 'Data Not Found'}</li>
                            </ul>
                        </div>
                        <div>
                            <h5>Integrations</h5>
                            <ul>
                                <li>${item.integrations[0] ? item.integrations[0] : 'Data Not Found'}</li>
                                <li>${item.integrations[1] ? item.integrations[1] : 'Data Not Found'}</li>
                                <li>${item.integrations[2] ? item.integrations[2] : 'Data Not Found'}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-6 border border-light rounded p-3">
                    <div class="container" style="position:relative">
                        <img src="${item.image_link[0] ? item.image_link[0] : 'Image Not Available'}" class="card-img-top" alt="...">
                        <div class="text-block p-1 w-3" style="position: absolute; bottom: 155px; right: 20px; background-color: red; color: white; border-radius:5px;">
                            <h5 style="font-size: 10px; text-align:center;">${item.accuracy.score} accuracy</h5>
                        </div>
                    </div>
                    <div>
                        <p class="text-center fw-bolder">${item.input_output_examples[0].input ? item.input_output_examples[0].input : 'Data Not Found'}</p>
                        <p class="text-center">${item.input_output_examples[0].output ? item.input_output_examples[0].output : 'Data Not Found'}</p>
                    </div>
                </div>
            </div>
        </div>`;
            aiDetails.appendChild(uniDiv);
}

 loadItems(6);