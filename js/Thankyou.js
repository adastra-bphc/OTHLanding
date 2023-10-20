document.addEventListener("DOMContentLoaded", function() {
    var oneform = document.querySelector('.one');
    var twoForm = document.querySelector('.two');
    var threeform = document.querySelector('.three');
    var onelink = document.querySelector('#form1');
    var twolink = document.querySelector('#form2');
    var threelink = document.querySelector('#form3');
});
    oneform.style.display = 'block';
    twoform.style.display = 'none';
    threeform.style.display = 'none';
    twolink.addEventListener('click', function(event) {
        event.preventDefault();
    oneform.style.display = 'none';
    twoform.style.display = 'block';
    threeform.style.display = 'none';
    });
    threelink.addEventListener('click', function(event) {
        event.preventDefault();
    oneform.style.display = 'none';
    twoform.style.display = 'none';
    threeform.style.display = 'block';
    });