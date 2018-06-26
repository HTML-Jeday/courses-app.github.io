// variables
const courses = document.querySelector('#courses-list');
const cartList = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');
const currentCartItems = document.querySelector('#current-items');
// listeners
loadEventListeners();
initFunctions();

function loadEventListeners() {
	courses.addEventListener('click', buyCourse);
	cartList.addEventListener('click', removeCourse);
	cartList.addEventListener('change', counterCart);
	clearCartBtn.addEventListener('click', clearCart);


}


//functions
function initFunctions() {
	let courses = getCoursesFromStorage();

		courses.forEach((course) =>{
				const row = document.createElement('tr');


	row.innerHTML = `
		<tr>
			<td>
				<img src="${course.image}" width="100" />
			</td>
			<td>
					<p>${course.title}</p>
			</td>
				<td>
					<p>${course.price}</p>
			</td>
				<td>
					<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>
	`
				cartList.appendChild(row);
})


counterCart();

}


function counterCart(){

	let courses = getCoursesFromStorage();


	if(courses.length != 0){

		currentCartItems.innerHTML = courses.length;

	}else{
		currentCartItems.innerHTML = '';
	}

}





function buyCourse(e) {
	e.preventDefault();
	let buttonCourse = e.target.classList.contains('add-to-cart');
	if(buttonCourse){
			const course = e.target.parentElement.parentElement;


			getCourseInfo(course);
	}
	counterCart();

}



function getCourseInfo(course) {

	const courseInfo = {
		image: course.querySelector('img').src,
		title: course.querySelector('h4').textContent,
		price: course.querySelector('.price span').textContent,
		id: course.querySelector('a').getAttribute('data-id')
	}
	console.log(courseInfo)

	addIntoCart(courseInfo)
}


function addIntoCart(course) {
	const row = document.createElement('tr');


	row.innerHTML = `
		<tr>
			<td>
				<img src="${course.image}" width="100" />
			</td>
			<td>
					<p>${course.title}</p>
			</td>
				<td>
					<p>${course.price}</p>
			</td>
				<td>
					<a href="#" class="remove" data-id="${course.id}">X</a>
			</td>
		</tr>
	`


	cartList.appendChild(row);


	addCourseToLocalStorage(course);
	counterCart();

}

function addCourseToLocalStorage(course) {

		let arrayLS = getCoursesFromStorage();
		console.log(arrayLS);

		arrayLS.push(course);

		console.log(arrayLS);

		localStorage.setItem('courses', JSON.stringify(arrayLS));


}

function getCoursesFromStorage() {

	let	arrayLS;

	if(localStorage.getItem('courses') === null){
			 arrayLS = [];
		}else{
			arrayLS = JSON.parse(localStorage.getItem('courses'));
		}
		return arrayLS;
}



function removeCourse(e) {
		e.preventDefault();
	let buttonCourse = e.target.classList.contains('remove');
	if(buttonCourse){
			e.target.parentElement.parentElement.remove();
			const id = e.target.getAttribute('data-id');
			removeCourseFromLocalStorage(id);
	}
	counterCart();
}


function clearCart(e) {
		e.preventDefault();
		cartList.innerHTML = '';
		localStorage.clear();
		counterCart();
}


function removeCourseFromLocalStorage(id) {
	let courses = getCoursesFromStorage();
	let CurrentId = id;
		courses.forEach( (course, index ) => {

			if(course.id == CurrentId){
					courses.splice(index, 1);

			}



		})



		localStorage.setItem('courses', JSON.stringify(courses));

		counterCart();

}