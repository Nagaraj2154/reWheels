
document.addEventListener('DOMContentLoaded', () => {
  // Show More / Show Less toggle
  const btn = document.querySelector('.btnShow');
  const moreText = document.querySelector('.moreText');

  if (btn && moreText) {
    btn.addEventListener('click', () => {
      const isHidden = moreText.style.display === 'none' || moreText.style.display === '';
      moreText.style.display = isHidden ? 'block' : 'none';
      btn.textContent = isHidden ? 'Show Less' : 'Show More';
    });
  }

  // Bootstrap custom validation
  (() => {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');

    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();


const dropdownBtn = document.getElementById("userDropdownBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownBtn.addEventListener("click", function (e) {
      dropdownMenu.classList.toggle("show");
    });

    // Close dropdown if clicked outside
    window.addEventListener("click", function (e) {
      if (!e.target.closest(".dropdown")) {
        dropdownMenu.classList.remove("show");
      }
    });
  
});
