function filterByTag() {
    const selectedTag = document.getElementById('tagSelect').value.toLowerCase();
    const contactList = document.querySelectorAll('.contact-li');
    let found = false;

    contactList.forEach(contact => {
        const contactTag = contact.querySelector('.contact-tag').textContent.toLowerCase();

        if (selectedTag === "" || contactTag.includes(selectedTag)) {
            contact.style.display = '';
            found = true;
        } else {
            contact.style.display = 'none';
            
        }
    });


    const noContactsMessage = document.getElementById('noContactsFound');
    if (found) {
        noContactsMessage.style.display = 'none';
    } else {
        noContactsMessage.style.display = 'block';
    }
}
//email and name
function filterContacts() {
    const input = document.getElementById('searchInput');
    const filter = input.value.toLowerCase();
    const contactList = document.querySelectorAll('.contact-li');
    let found = false;

    contactList.forEach(contact => {
        const contactName = contact.querySelector('.capitalize').textContent.toLowerCase();
        const contactEmail = contact.querySelector('.contact-email').textContent.toLowerCase();

        if (contactName.includes(filter) || contactEmail.includes(filter)) {
            contact.style.display = '';
            found = true;
        } else {
            contact.style.display = 'none';
        }
    });

//erro msg
    const noContactsMessage = document.getElementById('noContactsFound');
    if (found) {
        noContactsMessage.style.display = 'none';
    } else {
        noContactsMessage.style.display = 'block';
    }
}

//color for circlr 

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#'; 
    
   
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]; 
    }
    return color; 
  }
  

  function setRandomColors() {
    const circles = document.querySelectorAll('.circle'); 
    
 
    circles.forEach(circle => {
      circle.style.backgroundColor = getRandomColor(); 
    });
  }
  

  document.addEventListener('DOMContentLoaded', setRandomColors);
  

  //more btn 

  function toggleDetails(contactId) {
    const detailsDiv = document.getElementById(`details-${contactId}`);
    
    const buttonText = document.getElementById(`button-text-${contactId}`);
  
    if (detailsDiv.style.display === "none") {
      detailsDiv.style.display = "flex"; 
      buttonText.textContent = "Less"; 
    } else {
      detailsDiv.style.display = "none"; 
      buttonText.textContent = "More"; 
    }
  }
