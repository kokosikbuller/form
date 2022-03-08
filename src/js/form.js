const formSteps = document.querySelectorAll('.form_step');
const btnPrev = document.querySelector('.form_btns-back');
const btnNext = document.querySelector('.form_btns-next');
const steps = document.querySelectorAll('.step');
const progress = document.querySelector('.progress_success');
const form = document.querySelector('.form');
const finish = document.querySelector('.finish');

let index = 0;

btnNext.addEventListener('click', () => {
	if (index === formSteps.length - 1) {
		form.style.display = 'none';
		finish.style.display = 'block';
	}

	if (index < formSteps.length - 1) {
		index++;
		upadateState('+');
	}
});

btnPrev.addEventListener('click', () => {
	if (index > 0) {
		index--;
		upadateState('-');
	}
});

function upadateState(text) {
	formSteps.forEach((item) => {
		item.classList.contains('active') && item.classList.remove('active');
	});
	formSteps[index].classList.add('active');

	if (text === '-') {
		steps[index + 1].classList.remove('active_step');
	} else {
		steps[index].classList.add('active_step');
	}

	if (index === 0) {
		btnPrev.style.display = 'none';
	} else {
		btnPrev.style.display = 'inline-block';
	}

	const activeSteps = document.querySelectorAll('.active_step');
	const percent = ((activeSteps.length - 1) / (steps.length - 1)) * 100 + '%';

	progress.style.width = percent;
}

upadateState();
