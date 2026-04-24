// Gestion simple du formulaire de rendez-vous
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.rdv-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = {
                nom: document.getElementById('nom').value,
                prenom: document.getElementById('prenom').value,
                email: document.getElementById('email').value,
                telephone: document.getElementById('tel').value,
                groupeSanguin: document.getElementById('groupe-sanguin').value,
                specialite: document.getElementById('specialite').value,
                medecin: document.getElementById('medecin').value,
                date: document.getElementById('date').value,
                heure: document.getElementById('heure').value,
                motif: document.getElementById('motif').value
            };
            
            // Validation simple
            if (!formData.nom || !formData.prenom || !formData.email || !formData.telephone || !formData.specialite || !formData.date) {
                showMessage('Veuillez remplir tous les champs obligatoires', 'error');
                return;
            }
            
            // Sauvegarder dans localStorage
            let rendezvous = JSON.parse(localStorage.getItem('rendezvous') || '[]');
            const newRdv = {
                id: Date.now(),
                ...formData,
                dateCreation: new Date().toISOString()
            };
            rendezvous.push(newRdv);
            localStorage.setItem('rendezvous', JSON.stringify(rendezvous));
            
            // Afficher le succès
            showMessage(`Rendez-vous enregistré avec succès! Numéro: ${newRdv.id}`, 'success');
            
            // Réinitialiser le formulaire
            form.reset();
        });
    }
    
    // Fonction pour afficher les messages
    function showMessage(message, type) {
        const existingAlert = form.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.innerHTML = `<p>${message}</p>`;
        
        form.insertBefore(alertDiv, form.firstChild);
        alertDiv.scrollIntoView({ behavior: 'smooth' });
        
        if (type === 'success') {
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 5000);
        }
    }
    
    // Styles pour les alertes
    const style = document.createElement('style');
    style.textContent = `
        .alert {
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .alert-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
        .alert-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
    `;
    document.head.appendChild(style);
    
    // Fonction pour voir les rendez-vous (débogage)
    window.voirRendezvous = function() {
        const rdv = JSON.parse(localStorage.getItem('rendezvous') || '[]');
        console.log('Rendez-vous:', rdv);
        return rdv;
    };
    
    console.log('Formulaire de rendez-vous initialisé');
});