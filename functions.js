const navbarSupportedContent = document.getElementById('navbarSupportedContent');
navbarSupportedContent.style.display ="none";

function OpenCLoseNavbar() {
    if(navbarSupportedContent.style.display =="none")
    {
        document.getElementById('navbarSupportedContent').style.display = "block";
    }
    else 
    {
        navbarSupportedContent.style.display ="none";
    }
}

document.getElementById('navbar-toggler-btn').addEventListener('click', OpenCLoseNavbar);