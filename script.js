// script.js — simple front-end auth (no backend)
(function(){
const VALID_USER = 'John';
const VALID_PASS = 'John123';


// Exposed functions
window.handleLogin = function(e){
e.preventDefault();
const u = document.getElementById('username').value.trim();
const p = document.getElementById('password').value;
const err = document.getElementById('error');


if(u === VALID_USER && p === VALID_PASS){
// mark session and redirect
sessionStorage.setItem('loggedIn','true');
sessionStorage.setItem('username', u);
window.location.href = 'dashboard.html';
return false;
}


err.textContent = 'Invalid username or password.';
return false;
}


function ensureAuthOnDashboard(){
if(!location.pathname.endsWith('dashboard.html')) return;
const logged = sessionStorage.getItem('loggedIn');
if(logged !== 'true'){
// if not logged in, go back to login
window.location.href = 'index.html';
return;
}
// fill username on dashboard
const name = sessionStorage.getItem('username') || 'User';
const el = document.getElementById('userName');
const p = document.getElementById('profileName');
if(el) el.textContent = name;
if(p) p.textContent = 'Name: ' + name;
}


function attachLogout(){
const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtnTop');
logoutBtns.forEach(b => b && b.addEventListener('click', ()=>{
sessionStorage.removeItem('loggedIn');
sessionStorage.removeItem('username');
window.location.href = 'index.html';
}));
}


// run on load
document.addEventListener('DOMContentLoaded', ()=>{
ensureAuthOnDashboard();
attachLogout();
});
})();