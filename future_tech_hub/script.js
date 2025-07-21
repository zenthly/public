const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('fth_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('fth_theme') === 'dark') {
  document.body.classList.add('dark');
}
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status = document.getElementById('form-status');
  if (name && email && message) {
    status.textContent = "Thank you for reaching out, " + name + "! We'll respond soon.";
    status.style.color = '#0057ff';
    this.reset();
  } else {
    status.textContent = "Please fill in all fields.";
    status.style.color = '#e53e3e';
  }
});
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;
function animateStats() {
  statNumbers.forEach(num => {
    const target = +num.getAttribute('data-count');
    let count = 0;
    const step = Math.ceil(target / 60);
    const interval = setInterval(() => {
      count += step;
      if (count > target) count = target;
      num.textContent = count;
      if (count === target) clearInterval(interval);
    }, 20);
  });
}
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
      animateStats();
      statsAnimated = true;
    }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

const joinModal = document.getElementById('join-modal');
const openJoinBtn = document.getElementById('open-join-modal');
const closeJoinBtn = document.getElementById('close-join-modal');

openJoinBtn.addEventListener('click', () => {
  joinModal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
});
closeJoinBtn.addEventListener('click', closeModal);
joinModal.addEventListener('click', function(e) {
  if (e.target === joinModal) closeModal();
});
function closeModal() {
  joinModal.style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('join-form').reset();
  document.getElementById('join-status').textContent = '';
}

document.getElementById('join-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('join-name').value.trim();
  const email = document.getElementById('join-email').value.trim();
  const status = document.getElementById('join-status');
  if (name && email && email.includes("@")) {
    status.textContent = "Welcome, " + name + "! You're now a Future Tech Hub member.";
    status.style.color = '#0057ff';
    setTimeout(closeModal, 1800);
    this.reset();
  } else {
    status.textContent = "Please enter a valid name and email.";
    status.style.color = '#e53e3e';
  }
});
