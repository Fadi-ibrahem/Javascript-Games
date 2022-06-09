document.addEventListener('DOMContentLoaded', function(){

	//Declaring my Variables 
	var sliderImagesArr = Array.from(document.querySelectorAll('.slider-container img')),
			numOfImages = sliderImagesArr.length,
			currentSlideNumber = 1,
			slideNumberElement = document.getElementById('slide-number'),
			nextButton = document.getElementById('next'),
			prevButton = document.getElementById('prev');
	////////////////////////////////////////////////////////////////////////////////////////////


	//-1-Create The Main Ul Element, -2-Create <li>s in it, -3-Attach It to the Indicators Span,
	//-4-Create Array from indicators & -5-Enable Moving when Clicking on The Indicators
	let myUl = document.createElement('ul');
	myUl.setAttribute('id', 'pagination-ul') //Set ID on Created Ul Element

	for (let i=1; i<=numOfImages; i++){		//Create List Items Based on Slides Count
		var paginationItem = document.createElement('li');
		paginationItem.setAttribute('data-index', i);
		paginationItem.appendChild(document.createTextNode(i));
		myUl.appendChild(paginationItem)
	}

	document.getElementById('indicators').appendChild(myUl);//Putting The Ul in The Indicators Span 

	var paginationItemsArr = Array.from(document.querySelectorAll('#pagination-ul li')); //create array from indicators

	//Enable Moving when Clicking on The Indicators
	for (let i=0; i<paginationItemsArr.length; i++){
		paginationItemsArr[i].onclick = ()=>{
			currentSlideNumber = i+1
			checker();
		}
	}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	//Handle Click Event on Previous and Next Buttons
	nextButton.onclick = nextSlide;
	prevButton.onclick = prevSlide;
///////////////////////////////////////////////////////////////////////////////////////////////

	checker();	//Trigger The checker function


	//Creating next Slide Function
	function nextSlide(){
		if(currentSlideNumber === 5){
			return false
		} else {
			currentSlideNumber++
			checker();
		}
	};

	//Creating previous Slide Function
	function prevSlide(){
		if(currentSlideNumber === 1){
			return false
		} else {
			currentSlideNumber--
			checker();
		}
	} 

	//Creating Checker Function
	function checker(){
		slideNumberElement.textContent = 'Slide # '+(currentSlideNumber)+' of '+(numOfImages); //setting the slide number

		//Remove All Active Classes From Images and Pagination Bullets
		sliderImagesArr.forEach((img)=>{
			img.classList.remove('active')
		});
		paginationItemsArr.forEach((bullet)=>{
			bullet.classList.remove('active')
		});

		//Adding the Active Classes on Images and Pagination Bullets
		sliderImagesArr[currentSlideNumber - 1].classList.add('active'); //setting active class on current slide
		myUl.children[currentSlideNumber - 1].classList.add('active'); //setting active class on current pagination item

		//check if Current Slide is The First
		if(currentSlideNumber === 1){
			prevButton.classList.add('disabled');
		} else {
			prevButton.classList.remove('disabled');
		}

		//check if Current Slide is The Last
		if(currentSlideNumber === 5){
			nextButton.classList.add('disabled')
		} else {
			nextButton.classList.remove('disabled')
		}
	};
	//////////////////////////////////////////////////////////////////////////////////////////////
});