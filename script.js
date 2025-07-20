const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('mindcare_theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});
if (localStorage.getItem('mindcare_theme') === 'dark') {
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
    status.textContent = "Thank you for reaching out, " + name + "! We'll get back to you soon.";
    status.style.color = '#326da8';
    this.reset();
  } else {
    status.textContent = "Please complete all fields.";
    status.style.color = '#e53e3e';
  }
});

document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = document.getElementById('newsletter-email').value.trim();
  const status = document.getElementById('newsletter-status');
  if (email && email.includes("@")) {
    status.textContent = "Thank you for subscribing!";
    status.style.color = '#326da8';
    this.reset();
  } else {
    status.textContent = "Please enter a valid email address.";
    status.style.color = '#e53e3e';
  }
});
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;
function animateStats() {
  statNumbers.forEach(num => {
    const target = +num.getAttribute('data-count');
    let count = 0;
    const step = Math.ceil(target / 50);
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

function displayTasks() {
  const list = document.getElementById('task-list');
  list.innerHTML = '';
  getTasks().forEach((task, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span style="${task.completed ? 'text-decoration:line-through;color:#38a169;' : ''}">
        ${task.text} - ${task.date} ${task.time ? task.time : ''} (${task.recurring !== "None" ? task.recurring : "One-time"})
      </span>
    `;
    li.classList.add(`priority-${task.priority}`);
    if (!task.completed) {
      const completeBtn = document.createElement('button');
      completeBtn.textContent = 'Mark as Completed';
      completeBtn.onclick = () => {
        let tasks = getTasks();
        tasks[i].completed = true;
        saveTasks(tasks);
        displayTasks();
        updateStats();
        displayCalendarMonth();
        displayCalendarTasks();
      };
      li.appendChild(completeBtn);
    }
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => {
      let tasks = getTasks();
      tasks.splice(i, 1);
      saveTasks(tasks);
      displayTasks();
      updateStats();
      displayCalendarMonth();
      displayCalendarTasks();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}
let tasks = getTasks();
tasks[i].completed = true;
saveTasks(tasks);
displayTasks();
updateStats();
displayCalendarMonth();
displayCalendarTasks();
document.getElementById('congrats-message').style.display = 'block';
setTimeout(() => {
  document.getElementById('congrats-message').style.display = 'none';
}, 3000);
