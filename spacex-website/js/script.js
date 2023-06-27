const btn = document.getElementById("menu-btn");
const overlay = document.getElementById("overlay");
const mobileMenu = document.getElementById("mobile-menu");
const counters = document.querySelectorAll(".counter");
const observer = new IntersectionObserver(showStats, { threshold: 0.2 });
const mainHeader = document.querySelector(".main-header");

btn.addEventListener("click", navToggle);

window.addEventListener("wheel", (e) => {
	e.deltaY > 0
		? (mainHeader.style.opacity = 0)
		: (mainHeader.style.opacity = 1);
});

function navToggle(e) {
	btn.classList.toggle("open");
	overlay.classList.toggle("overlay-show");
	document.body.classList.toggle("stop-scrolling");
	mobileMenu.classList.toggle("show-menu");
}

function showStats(entries) {
	const [entry] = entries;
	if (!entry.isIntersecting) return;
	counters.forEach((counter) => {
		let current = 0;
		let timeLoad = 2000;
		const data = +counter.dataset.target;
		function updateCounter(data) {
			setTimeout(() => {
				if (current < data) {
					current++;
					counter.innerHTML = current;
					updateCounter(data);
				}
			}, timeLoad/data);
		}
		updateCounter(data);
	});
}

if (document.querySelector(".stats"))
	observer.observe(document.querySelector(".stats"));
