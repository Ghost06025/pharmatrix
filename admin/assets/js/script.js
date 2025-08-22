$(document).ready(function () {
    // Chemin jusqu'au repertoire portant le fichier
    function getPathFolder() {
        const currentURL = window.location.href;
        const pathArray = currentURL.split('/');
        const directoryURL = pathArray.slice(0, pathArray.length - 1).join('/');
        return directoryURL;
    }


    // Data table functionality
    $('#dataTable').DataTable({
        responsive: true,
        language: {
            url: getPathFolder() + '/assets/js/French.json'
        },
        dom: '<"top"f>rt<"bottom"lip><"clear">',
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        columnDefs: [
            {
                targets: [5], // Colonne Actions
                orderable: false,
                searchable: false
            }
        ]
    });


    // Search functionality
    $('.search-bar form').submit(function(e) {
        e.preventDefault();
        const searchTerm = $(this).find('input').val().toLowerCase();
        
        $('#dataTable tbody tr').each(function() {
            const rowText = $(this).text().toLowerCase();
            if (rowText.indexOf(searchTerm) === -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    });


    // Vérification initiale de la largeur de l'ecran
    function checkWidth() {
        if ($(window).width() < 992) {
            $('#sidebar').addClass('active');
            $('.menu-text').hide();
        } else {
            $('#sidebar').removeClass('active');
            $('.menu-text').show();
        }
    }

    // Appel initial de la fonction
    checkWidth();

    // Écouteur d'événement pour le redimensionnement de la fenêtre
    $(window).resize(checkWidth);


    // Sidebar toggle functionality
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
        
        // Add animation class
        $('#sidebar').addClass('animated fadeIn');
        
        // Remove animation class after animation completes
        setTimeout(function() {
            $('#sidebar').removeClass('animated fadeIn');
        }, 300);
    });

    // Dropdown menu
    $('.dropdown-toggle').dropdown();

    // Active menu item
    $('.list-unstyled li').on('click', function() {
        $('.list-unstyled li').removeClass('active');
        $(this).addClass('active');
    });

    // Responsive adjustments
    $(window).resize(function() {
        if ($(window).width() < 768) {
            $('#sidebar').addClass('active');
        } else {
            $('#sidebar').removeClass('active');
        }
    });

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();


    // Infobulles pour les icônes en mode réduit
    $('#sidebar.active li a').hover(
        function() {
            $(this).attr('data-bs-toggle', 'tooltip');
            $(this).attr('data-bs-placement', 'right');
            $(this).attr('title', $(this).find('.menu-text').text());
            $(this).tooltip('show');
        },
        function() {
            $(this).tooltip('hide');
            $(this).removeAttr('data-bs-toggle');
            $(this).removeAttr('data-bs-placement');
            $(this).removeAttr('title');
        }
    );


    // Summary cards hover effect
    $('.summary-card').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
            $(this).css('box-shadow', '0 0.5rem 1.5rem rgba(0, 0, 0, 0.15)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
            $(this).css('box-shadow', '0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.1)');
        }
    );









    /*
    =======================================
        Users
    =======================================
    */

    // Initialisation de DataTable
    $('#usersTable').DataTable({
        responsive: true,
        language: {
            url: getPathFolder() + '/assets/js/French.json'
        },
        dom: '<"top"f>rt<"bottom"lip><"clear">',
        pageLength: 10,
        lengthMenu: [10, 25, 50, 100],
        columnDefs: [
            {
                targets: [5], // Colonne Actions
                orderable: false,
                searchable: false
            }
        ]
    });


    // Bouton d'ajout d'utilisateur
    $('.dropdown-item').on('click', function() {
        const action = $(this).find('i').attr('class').split(' ')[1];
        
        switch(action) {
            case 'fa-plus':
                alert('Ajouter un nouvel utilisateur');
                break;
            case 'fa-file-export':
                alert('Exporter la liste');
                break;
            case 'fa-filter':
                alert('Filtrer les résultats');
                break;
        }
    });

    /*
    =======================================
        End Users
    =======================================
    */







    /*
    =======================================
        Commandes
    =======================================
    */

    // Variables
    let currentStep = 1;
    const totalSteps = 3;
    let commandeData = {};
    
    // Initialisation DataTable
    const commandesTable = $('#commandesTable').DataTable({
        responsive: true,
        language: {
            url: getPathFolder() + '/assets/js/French.json'
        },
        columns: [
            { data: 'id' },
            { 
                data: 'client',
                render: function(data) {
                    return `${data.nom} ${data.prenom}`;
                }
            },
            { data: 'medicament.nom' },
            { data: 'quantite' },
            { 
                data: 'prix_total',
                render: function(data) {
                    return `${parseFloat(data).toLocaleString('fr-FR')} FCFA`;
                },
                className: 'text-end'
            },
            { 
                data: 'date',
                render: function(data) {
                    return new Date(data).toLocaleDateString('fr-FR');
                }
            },
            { 
                data: 'statut',
                render: function(data) {
                    let badgeClass = '';
                    switch(data) {
                        case 'validée': badgeClass = 'badge-validee'; break;
                        case 'annulée': badgeClass = 'badge-annulee'; break;
                        default: badgeClass = 'badge-en-cours';
                    }
                    return `<span class="badge badge-statut ${badgeClass}">${data}</span>`;
                }
            },
            {
                data: null,
                render: function() {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary view-btn" title="Voir">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-danger cancel-btn" title="Annuler">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    `;
                },
                orderable: false,
                className: 'text-center'
            }
        ],
        dom: '<"top"<"row"<"col-md-6"l><"col-md-6"f>>>rt<"bottom"<"row"<"col-md-6"i><"col-md-6"p>>><"clear">'
    });

    // Chargement des médicaments pour le select
    function loadMedicaments() {
        // Simulation - en pratique vous feriez un appel AJAX
        const medicaments = [
            { id: 1, nom: "Paracétamol", prix: 2000 },
            { id: 2, nom: "Efferalgan", prix: 3000 },
            { id: 3, nom: "Doliprane", prix: 2500 }
        ];
        
        const select = $('#medicamentId');
        select.empty().append('<option value="">Sélectionnez un médicament</option>');
        
        medicaments.forEach(med => {
            select.append(`<option value="${med.id}" data-prix="${med.prix}">${med.nom} - ${med.prix} FCFA</option>`);
        });
    }

    // Gestion des événements
    $('.add-commande-btn').click(openCommandeModal);
    $('#medicamentId').change(updatePrixUnitaire);
    $('#nextBtn').click(goToNextStep);
    $('#prevBtn').click(goToPrevStep);
    $('#commandeWizardForm').submit(finalizeCommande);

    // Fonctions
    function openCommandeModal() {
        currentStep = 1;
        commandeData = {};
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $('.step-1').addClass('active').show();
        $('#prevBtn').hide();
        $('#nextBtn').show();
        $('#submitBtn').hide();
        $('.alert-container').empty();
        $('#commandeWizardForm')[0].reset();
        loadMedicaments();
        $('#commandeModal').modal('show');
    }

    function updatePrixUnitaire() {
        const selectedOption = $('#medicamentId option:selected');
        const prix = selectedOption.data('prix') || 0;
        $('#prixUnitaire').val(`${prix.toLocaleString('fr-FR')} FCFA`);
    }

    function validateStep(step) {
        let isValid = true;
        
        if (step === 1) {
            // Validation Étape 1 (Client)
            if (!$('#clientNom').val().trim()) {
                $('#clientNom').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientNom').removeClass('is-invalid');
            }
            
            if (!$('#clientPrenom').val().trim()) {
                $('#clientPrenom').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientPrenom').removeClass('is-invalid');
            }
            
            const email = $('#clientEmail').val().trim();
            if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                $('#clientEmail').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientEmail').removeClass('is-invalid');
            }
            
            if (!$('#clientTelephone').val().trim()) {
                $('#clientTelephone').addClass('is-invalid');
                isValid = false;
            } else {
                $('#clientTelephone').removeClass('is-invalid');
            }
            
            if (isValid) {
                commandeData.client = {
                    nom: $('#clientNom').val().trim(),
                    prenom: $('#clientPrenom').val().trim(),
                    email: email,
                    telephone: $('#clientTelephone').val().trim()
                };
            }
        } else if (step === 2) {
            // Validation Étape 2 (Médicament)
            if (!$('#medicamentId').val()) {
                $('#medicamentId').addClass('is-invalid');
                isValid = false;
            } else {
                $('#medicamentId').removeClass('is-invalid');
            }
            
            if (!$('#quantite').val() || parseInt($('#quantite').val()) < 1) {
                $('#quantite').addClass('is-invalid');
                isValid = false;
            } else {
                $('#quantite').removeClass('is-invalid');
            }
            
            if (isValid) {
                const selectedOption = $('#medicamentId option:selected');
                commandeData.medicament = {
                    id: $('#medicamentId').val(),
                    nom: selectedOption.text().split(' - ')[0],
                    prix: selectedOption.data('prix')
                };
                commandeData.quantite = parseInt($('#quantite').val());
                commandeData.instructions = $('#instructions').val().trim();
                commandeData.prix_total = commandeData.medicament.prix * commandeData.quantite;
            }
        } else if (step === 3) {
            // Validation Étape 3 (Finalisation)
            if (!$('#modePaiement').val()) {
                $('#modePaiement').addClass('is-invalid');
                isValid = false;
            } else {
                $('#modePaiement').removeClass('is-invalid');
                commandeData.mode_paiement = $('#modePaiement').val();
            }
            
            // Mise à jour du récapitulatif
            if (isValid) {
                $('#confirmationClient').text(`${commandeData.client.nom} ${commandeData.client.prenom}`);
                $('#confirmationTelephone').text(commandeData.client.telephone);
                $('#confirmationEmail').text(commandeData.client.email || 'Non renseigné');
                $('#confirmationMedicament').text(`${commandeData.medicament.nom} (${commandeData.medicament.prix} FCFA)`);
                $('#confirmationQuantite').text(commandeData.quantite);
                $('#confirmationPrixUnitaire').text(`${commandeData.medicament.prix.toLocaleString('fr-FR')} FCFA`);
                $('#confirmationTotal').text(`${commandeData.prix_total.toLocaleString('fr-FR')} FCFA`);
            }
        }
        
        return isValid;
    }

    function goToNextStep() {
        if (!validateStep(currentStep)) return;
        
        currentStep++;
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $(`.step-${currentStep}`).addClass('active').show();
        $('#prevBtn').show();
        
        if (currentStep === totalSteps) {
            $('#nextBtn').hide();
            $('#submitBtn').show();
        }
    }

    function goToPrevStep() {
        currentStep--;
        $('#commandeModalTitle span').text(currentStep);
        $('.step').removeClass('active').hide();
        $(`.step-${currentStep}`).addClass('active').show();
        $('#nextBtn').show();
        $('#submitBtn').hide();
        
        if (currentStep === 1) {
            $('#prevBtn').hide();
        }
    }

    function finalizeCommande(e) {
        e.preventDefault();
        
        if (!validateStep(currentStep)) return;
        
        // Simulation d'enregistrement - en pratique vous feriez un appel AJAX
        commandeData.id = Math.floor(Math.random() * 1000) + 1000;
        commandeData.date = new Date().toISOString();
        commandeData.statut = 'en cours';
        
        // Ajout à la table
        commandesTable.row.add(commandeData).draw();
        
        // Fermeture du modal
        $('#commandeModal').modal('hide');
        
        // Notification
        showAlert('success', 'Commande créée avec succès!');
    }

    function showAlert(type, message) {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show position-fixed top-0 end-0 m-3">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $('body').append(alert);
        
        setTimeout(() => {
            alert.alert('close');
        }, 5000);
    }

    /*
    =======================================
        End Commandes
    =======================================
    */














    /*
    =======================================
        Medicaments
    =======================================
    */

    // Configuration de la table avec des données locales
    const medicamentsTable = $('#medicamentsTable').DataTable({
        responsive: true,
        language: {
            url: getPathFolder() + '/assets/js/French.json'
        },
        data: [], // On initialise avec un tableau vide
        columns: [
            { data: 'id', title: 'ID' },
            { data: 'designation', title: 'Désignation' },
            { 
                data: 'description', 
                title: 'Description',
                render: function(data) {
                    return data || 'Aucune description';
                }
            },
            { 
                data: 'prix', 
                title: 'Prix (FCFA)',
                render: function(data) {
                    return parseFloat(data).toLocaleString('fr-FR') + ' FCFA';
                },
                className: 'text-end'
            },
            { 
                data: 'date_ajout',
                title: 'Date',
                render: function(data) {
                    return data ? new Date(data).toLocaleDateString('fr-FR') : '--';
                }
            },
            {
                data: null,
                title: 'Actions',
                render: function() {
                    return `
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-outline-primary view-btn" title="Voir">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-outline-warning edit-btn" title="Modifier">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn btn-outline-danger delete-btn" title="Supprimer">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    `;
                },
                orderable: false,
                className: 'text-center'
            }
        ],
        dom: '<"top"<"row"<"col-md-6"l><"col-md-6"f>>>rt<"bottom"<"row"<"col-md-6"i><"col-md-6"p>>><"clear">',
        initComplete: function() {
            // Ajout du bouton dans la zone des boutons
            $('.add-medicament-btn').appendTo($('.dt-buttons'));
        }
    });


    /*
    =======================================
        End Medicaments
    =======================================
    */



    /*
    =======================================
        Settings
    =======================================
    */

    // Gestion du formulaire de profil
    $('#profileForm').submit(function(e) {
        e.preventDefault();
        
        const formData = {
            nom: $('#adminNom').val().trim(),
            prenom: $('#adminPrenom').val().trim(),
            email: $('#adminEmail').val().trim(),
            telephone: $('#adminTelephone').val().trim()
        };

        // Validation simple
        if (!formData.nom || !formData.prenom || !formData.email) {
            showAlert('danger', 'Veuillez remplir tous les champs obligatoires');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showAlert('danger', 'Veuillez saisir un email valide');
            return;
        }

        // Enregistrement (simulé)
        console.log('Profil mis à jour:', formData);
        showAlert('success', 'Profil mis à jour avec succès !');
    });

    // Gestion du changement de mot de passe
    $('#passwordForm').submit(function(e) {
        e.preventDefault();
        
        const currentPassword = $('#currentPassword').val();
        const newPassword = $('#newPassword').val();
        const confirmPassword = $('#confirmPassword').val();

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            showAlert('danger', 'Veuillez remplir tous les champs');
            return;
        }

        if (newPassword.length < 8) {
            showAlert('danger', 'Le mot de passe doit contenir au moins 8 caractères');
            return;
        }

        if (newPassword !== confirmPassword) {
            showAlert('danger', 'Les mots de passe ne correspondent pas');
            return;
        }

        // Enregistrement (simulé)
        console.log('Mot de passe changé');
        showAlert('success', 'Mot de passe changé avec succès !');
        $('#passwordForm')[0].reset();
    });

    // Gestion des préférences système
    $('#systemForm').submit(function(e) {
        e.preventDefault();
        
        const preferences = {
            language: $('#language').val(),
            timezone: $('#timezone').val(),
            theme: $('#theme').val(),
            notifications: $('#notifications').is(':checked')
        };

        // Enregistrement (simulé)
        console.log('Préférences mises à jour:', preferences);
        showAlert('success', 'Préférences enregistrées avec succès !');
        
        // Application du thème (exemple)
        if (preferences.theme === 'dark') {
            $('body').addClass('dark-theme');
        } else {
            $('body').removeClass('dark-theme');
        }
    });

    // Réinitialisation des paramètres
    $('.reset-settings-btn').click(function() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
            // Réinitialisation (simulée)
            $('#systemForm')[0].reset();
            $('#language').val('fr');
            $('#timezone').val('UTC+1');
            $('#theme').val('light');
            $('#notifications').prop('checked', true);
            
            console.log('Paramètres réinitialisés');
            showAlert('success', 'Paramètres réinitialisés avec succès !');
        }
    });

    // Suppression de compte
    $('#confirmDeleteAccount').click(function() {
        const confirmEmail = $('#confirmEmail').val();
        
        if (confirmEmail !== 'admin@pharmatri.com') {
            showAlert('danger', 'Email de confirmation incorrect', '#confirmDeleteModal .modal-body');
            return;
        }

        // Suppression (simulée)
        console.log('Compte supprimé');
        $('#confirmDeleteModal').modal('hide');
        showAlert('warning', 'Votre compte a été supprimé. Redirection...');
        
        // Redirection (exemple)
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });

    // Changement de photo de profil
    $('.change-photo-btn').click(function(e) {
        e.preventDefault();
        // Simule l'ouverture d'un sélecteur de fichier
        $('<input type="file" accept="image/*">').on('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    $('.profile-picture img').attr('src', event.target.result);
                    showAlert('success', 'Photo de profil mise à jour !');
                };
                reader.readAsDataURL(file);
            }
        }).click();
    });

    // Fonction d'affichage des alertes
    function showAlert(type, message, container = 'body') {
        const alert = $(`
            <div class="alert alert-${type} alert-dismissible fade show alert-position">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `);
        
        $(container).append(alert);
        
        setTimeout(() => {
            alert.alert('close');
        }, 5000);
    }

    /*
    =======================================
        End Settings
    =======================================
    */
});
