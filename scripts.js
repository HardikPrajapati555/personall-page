document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const addProjectBtn = document.getElementById('add-project-btn');
    const loginForm = document.getElementById('login-form');
    const projectForm = document.getElementById('project-form');
    const projectNameInput = document.getElementById('project-name');
    const projectLinkInput = document.getElementById('project-link');
    const projectGithubInput = document.getElementById('project-github');
    const projectsList = document.getElementById('projects');
  
    // Load projects from localStorage
    loadProjects();
  
    // Check if user is logged in
    checkAuth();
  
    loginBtn.addEventListener('click', () => {
      loginForm.style.display = 'block';
    });
  
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('auth');
      checkAuth();
    });
  
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      // Simple authentication check
      if (username === 'admin' && password === 'admin') {
        localStorage.setItem('auth', 'true');
        checkAuth();
        loginForm.reset();
        loginForm.style.display = 'none';
      } else {
        alert('Invalid credentials');
      }
    });
  
    addProjectBtn.addEventListener('click', () => {
      projectForm.style.display = 'block';
    });
  
    projectForm.addEventListener('submit', (event) => {
      event.preventDefault();
  
      const projectName = projectNameInput.value;
      const projectLink = projectLinkInput.value;
      const projectGithub = projectGithubInput.value;
  
      const project = {
        name: projectName,
        link: projectLink,
        github: projectGithub
      };
  
      addProjectToDOM(project);
      saveProject(project);
  
      projectForm.reset();
      projectForm.style.display = 'none';
    });
  
    function addProjectToDOM(project) {
      const listItem = document.createElement('li');
      const nameLink = document.createElement('a');
      nameLink.href = project.link;
      nameLink.textContent = project.name;
      nameLink.target = '_blank';
      
      const githubLink = document.createElement('a');
      githubLink.href = project.github;
      githubLink.textContent = 'GitHub';
      githubLink.target = '_blank';
  
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        deleteProject(project);
        listItem.remove();
      });
  
      listItem.appendChild(nameLink);
      listItem.appendChild(document.createTextNode(' | '));
      listItem.appendChild(githubLink);
      listItem.appendChild(deleteBtn);
  
      projectsList.appendChild(listItem);
    }
  
    function saveProject(project) {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  
    function loadProjects() {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projects.forEach(project => addProjectToDOM(project));
    }
  
    // function deleteProject(projectToDelete) {
    //   let projects = JSON.parse(localStorage.getItem('projects')) || [];
    //   projects = projects.filter(project => project.name !== projectToDelete.name || project.link !== projectToDelete.link || project.github !== projectToDelete.github);
    //   localStorage.setItem('projects', JSON.stringify(projects));
    // }
  
    function checkAuth() {
      const isAuthenticated = localStorage.getItem('auth') === 'true';
      if (isAuthenticated) {
        loginBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
        addProjectBtn.style.display = 'inline-block';
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => btn.style.display = 'inline-block');
      } else {
        loginBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
        addProjectBtn.style.display = 'none';
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(btn => btn.style.display = 'none');
      }
    }
  });
  