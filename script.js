// Définition des caractères majuscules, minuscules des chiffres et symboles utilisés dans la génération de mot de passe
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";
// Sélectionne les boutons de copie d'affichage et de génération
var showBtn = document.getElementById('show');
var copyBtn = document.getElementById('copy');
var refreshBtn = document.getElementById('refresh');
// Sélectionne l'élément de la plage et les boutons d'incrémentation/décrémentation
var rangeInput = document.getElementById('range');
var decreaseBtn = document.getElementById('decrease');
var increaseBtn = document.getElementById('increase');
// Sélection des cases à cocher pour les différents types de caractères
var uppercaseCheckbox = document.getElementById('uppercase');
var lowercaseCheckbox = document.getElementById('lowercase');
var numbersCheckbox = document.getElementById('numbers');
var symbolsCheckbox = document.getElementById('symbols');
// Séléctionne l'indicateur de force
var strengthIndicator = document.getElementById('strength');

// Fonction qui permet de générer un mot de passe aléatoire
function getPassword(){
    // Remet le bouton de copie au texte initial
    copyBtn.textContent = 'Copy';
    // Récupère la longueur du mot de passe à partir de l'élément de plage (input type="range")
    var passwordLength = document.querySelector('input[type="range"]').value;
    // Récupère les options pour inclure différents types de caractères
    var includeUppercase = uppercaseCheckbox.checked;
    var includeLowercase = lowercaseCheckbox.checked;
    var includeNumbers = numbersCheckbox.checked;
    var includeSymbols = symbolsCheckbox.checked;
    // Initialise une chaîne vide pour stocker tous les caractères possibles à inclure dans le mot de passe
    var charsToUse = '';
    // Initialise une chaîne vide pour stocker le mot de passe généré
    var password = '';
    // Cochage automatique des minuscules dans le cas ou tout les choix sont décochés
    if(!uppercaseCheckbox.checked&&!lowercaseCheckbox.checked&&!numbersCheckbox.checked&&!symbolsCheckbox.checked){
        lowercaseCheckbox.checked = true;
        charsToUse += lowercaseChars;
    }
    // Construit la chaîne charsToUse en fonction des options sélectionnées
    if (includeUppercase) {
        charsToUse += uppercaseChars; // Ajoute les lettres majuscules à la chaîne
    }
    if (includeLowercase) {
        charsToUse += lowercaseChars; // Ajoute les lettres minuscules à la chaîne
    }
    if (includeNumbers) {
        charsToUse += numberChars; // Ajoute les chiffres à la chaîne
    }
    if (includeSymbols) {
        charsToUse += symbolChars; // Ajoute les symboles à la chaîne
    }
    // Génère le mot de passe en sélectionnant aléatoirement des caractères de charsToUse
    for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * charsToUse.length); // Génère un index aléatoire
        password += charsToUse[randomIndex]; // Ajoute le caractère correspondant à l'index aléatoire au mot de passe
    }
    // Met à jour la couleur de l'indicateur de force
    setStrengthColor(password);
    // Met à jour le champ de texte dans l'interface utilisateur avec le mot de passe généré
    document.getElementById('password').value = password;
}

// Fonction qui gères l'indicateur de force ainsi que les boutons + et -
function setStrengthColor(password){
    var couleur;
    strengthIndicator.style.color = 'black';
    switch (true) {
        case (password.length >= 1 && password.length <= 4):
            couleur = "#FF7800";
            strengthIndicator.textContent = "🌱 Very weak";
            break;
        case (password.length >= 5 && password.length <= 7):
            couleur = "#FFB370";
            strengthIndicator.textContent = "🏕️ Weak";
            break;
        case (password.length >= 8 && password.length <= 10):
            couleur = "#FEDDBF";
            strengthIndicator.textContent = "🏠 Good";
            break;
        case (password.length >= 11 && password.length <= 13):
            couleur = "#D5F2A5";
            strengthIndicator.textContent = "🏰 Strong";
            break;
        case (password.length > 13 && password.length <= 45):
            couleur = "#99E438";
            strengthIndicator.textContent = "🚀 Very strong";
            break;
        case (password.length > 45):
            couleur = "#0D41AB";
            strengthIndicator.textContent = "☢️ Nuclear launch code";
            strengthIndicator.style.color = 'white'
            break;
        default:
            couleur = "#fff"; // Couleur par défaut si la longueur du mot de passe ne correspond à aucun cas
            strengthIndicator.textContent = "Strength";
            break;
    }
    // Gère la cohérence du style des boutons + et -
    decreaseBtn.classList.add('white');
    decreaseBtn.classList.remove('unavailable');
    increaseBtn.classList.add('white');
    increaseBtn.classList.remove('unavailable');
    if (password.length < 2) {
        decreaseBtn.classList.add('unavailable');
        decreaseBtn.classList.remove('white');
    } else if (password.length > 49) {
        increaseBtn.classList.add('unavailable');
        increaseBtn.classList.remove('white');
    }
    // Appliquer la couleur au bouton
    document.getElementById('strength').style.backgroundColor = couleur;
}

// Fonction qui permet de coller le mot de passe dans le presse-papier
function copyAndAlert(){
    // Récupère le mot de passe depuis le champ de texte
    var password = document.getElementById('password').value;
    // Copie le mot de passe dans le presse-papiers
    navigator.clipboard.writeText(password)
        .then(function() {
            // Affiche une alerte pour informer l'utilisateur que le mot de passe a été copié
            copyBtn.textContent = 'Copied!';
        })
        .catch(function(error) {
            // Gère les erreurs, le cas échéant
            console.error('Failed to copy password: ', error);
        });
}

// Génère un mot de passe au chargement de la page
getPassword();

// Événement de clic pour le bouton d'affichage
showBtn.addEventListener('click',function(){
    // Récupère le mot de passe depuis le champ de texte
    var password = document.getElementById('password').value;
    alert('Safety :\n' + strengthIndicator.textContent.replace(/[^a-zA-Z\s]/g, '').substring(1) +
          '\nPassword :\n' + password);
});
// Événement de clic pour le bouton de copie
copyBtn.addEventListener('click',copyAndAlert);
// Événement de clic pour le bouton de génération
refreshBtn.addEventListener('click',getPassword);
// Événement de clic pour le bouton de décrémentation
decreaseBtn.addEventListener('click', function() {
    // Vérifie que la valeur de la plage est supérieure à la valeur minimale autorisée (dans ce cas, 1)
    if (parseInt(rangeInput.value) > parseInt(rangeInput.min)) {
        // Gères le style du bouton pour plus de cohérence
        increaseBtn.classList.remove('unavailable');
        increaseBtn.classList.add('white');
        // Décrémente la valeur de la plage de 1
        rangeInput.value = parseInt(rangeInput.value) - 1;
         // Sélectionne l'élément span contenant la classe "passwordLength"
        var passwordLengthSpan = document.querySelector('.passwordLength');
        // Met à jour le texte dans le span avec la valeur actuelle de la plage
        passwordLengthSpan.textContent = rangeInput.value;
        getPassword();
        
    } 
});
// Événement de clic pour le bouton d'incrémentation
increaseBtn.addEventListener('click', function(){
   // Vérifie que la valeur de la plage est inférieure à la valeur maximale autorisée (dans ce cas, 50)
    if (parseInt(rangeInput.value) < parseInt(rangeInput.max)) {
        // Gères le style du bouton pour plus de cohérence
        decreaseBtn.classList.remove('unavailable');
        decreaseBtn.classList.add('white');
        // Incrémente la valeur de la plage de 1
        rangeInput.value = parseInt(rangeInput.value) + 1;
        // Sélectionne l'élément span contenant la classe "passwordLength"
        var passwordLengthSpan = document.querySelector('.passwordLength');
        // Met à jour le texte dans le span avec la valeur actuelle de la plage
        passwordLengthSpan.textContent = rangeInput.value;
        getPassword();
        
    }
});
// Met à jour l'affichage de la longueur du mot de passe lors du changement de la plage
rangeInput.addEventListener('input', function() {
    // Sélectionne l'élément span contenant la classe "passwordLength"
    var passwordLengthSpan = document.querySelector('.passwordLength');
    // Met à jour le texte dans le span avec la valeur actuelle de la plage
    passwordLengthSpan.textContent = rangeInput.value;
    getPassword();
});


// Met à jour l'affichage de la longueur du mot de passe lors du changement des caractères à utiliser
uppercaseCheckbox.addEventListener('change', getPassword);
lowercaseCheckbox.addEventListener('change', getPassword);
numbersCheckbox.addEventListener('change', getPassword);
symbolsCheckbox.addEventListener('change', getPassword);
