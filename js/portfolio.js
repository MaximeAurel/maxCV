document.addEventListener('DOMContentLoaded', function () {
	var menuToggle = document.querySelector('.menu-toggle');
	var siteNav = document.querySelector('#site-nav');

	if (menuToggle && siteNav) {
		menuToggle.addEventListener('click', function () {
			var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
			menuToggle.setAttribute('aria-expanded', String(!isOpen));
			siteNav.classList.toggle('is-open', !isOpen);
		});

		siteNav.querySelectorAll('a').forEach(function (link) {
			link.addEventListener('click', function () {
				menuToggle.setAttribute('aria-expanded', 'false');
				siteNav.classList.remove('is-open');
			});
		});
	}

	var year = document.querySelector('#current-year');
	if (year) {
		year.textContent = new Date().getFullYear();
	}

	var printButton = document.querySelector('#print-cv');
	if (printButton) {
		printButton.addEventListener('click', function () {
			window.print();
		});
	}

	var contactForm = document.querySelector('#contact-form');
	if (contactForm) {
		contactForm.addEventListener('submit', function (event) {
			event.preventDefault();
			if (!contactForm.reportValidity()) {
				return;
			}

			var formData = new FormData(contactForm);
			var name = String(formData.get('name')).trim().replace(/[\r\n]+/g, ' ');
			var email = String(formData.get('email')).trim().replace(/[\r\n]+/g, '');
			var subject = String(formData.get('subject')).trim().replace(/[\r\n]+/g, ' ');
			var message = String(formData.get('message')).trim();
			var body = 'Nom : ' + name + '\nE-mail : ' + email + '\n\n' + message;
			var mailto = 'mailto:maximeaurel.ma@gmail.com?subject=' +
				encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

			document.querySelector('#contact-status').textContent =
				'Votre logiciel de messagerie va s’ouvrir. Vérifiez le message puis envoyez-le depuis votre boîte e-mail.';
			window.location.href = mailto;
		});
	}

	var liaPanel = document.querySelector('#lia-panel');
	var liaLauncher = document.querySelector('.lia-launcher');
	var liaClose = document.querySelector('.lia-close');
	var liaForm = document.querySelector('#lia-form');
	var liaInput = document.querySelector('#lia-input');
	var liaMessages = document.querySelector('#lia-messages');

	if (liaPanel && liaLauncher && liaClose && liaForm && liaInput && liaMessages) {
		function setLiaOpen(isOpen) {
			liaPanel.classList.toggle('is-open', isOpen);
			liaPanel.setAttribute('aria-hidden', String(!isOpen));
			liaLauncher.setAttribute('aria-expanded', String(isOpen));
			if (isOpen) {
				liaInput.focus();
			}
			else {
				liaLauncher.focus();
			}
		}

		function addLiaMessage(text, kind) {
			var message = document.createElement('p');
			message.className = 'lia-message lia-message-' + kind;
			message.textContent = text;
			liaMessages.appendChild(message);
			liaMessages.scrollTop = liaMessages.scrollHeight;
		}

		function answerLia(question) {
			var text = question.toLocaleLowerCase('fr').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

			if (/\b(bonjour|bonsoir|salut|coucou|hello|hey)\b/.test(text)) {
				return 'Bonjour ! Je peux vous parler du parcours, des compétences, de la formation ou des coordonnées de Maxime.';
			}
			if (/\b(merci|remerciement)\b/.test(text)) {
				return 'Avec plaisir ! Si vous souhaitez échanger directement avec Maxime, vous pouvez lui écrire à maximeaurel.ma@gmail.com.';
			}
			if (/\b(qui est|profil|presente|presentation|identite|maxime)\b/.test(text)) {
				return 'Maxime Aurel Onogo Maroga est un professionnel IT polyvalent gabonais, basé à Libreville. Formé en génie logiciel, il possède une expérience en développement web, maintenance informatique, support aux utilisateurs et gestion d’infrastructures.';
			}
			if (/\b(mail|email|e-mail|telephone|tel|contacter|contact|joindre|adresse|linkedin|facebook)\b/.test(text)) {
				return 'Vous pouvez contacter Maxime à maximeaurel.ma@gmail.com ou au +241 77 66 99 05. Il est basé à Libreville, au Gabon. Les liens vers ses réseaux et le formulaire de contact sont dans la section Contact.';
			}
			if (/\b(langue|francais|nationalite|gabonais|pays|ville|localisation|habite|reside)\b/.test(text)) {
				return 'Maxime est gabonais, basé à Libreville au Gabon. Sa langue principale est le français.';
			}
			if (/\b(formation|etude|diplome|licence|bts|baccalaureat|bac|ecole|universite|insam|cameroun)\b/.test(text)) {
				return 'Maxime est titulaire d’une Licence professionnelle en Génie logiciel (IUEs-INSAM, Cameroun, 2023–2024) et d’un BTS en Génie logiciel (IUEs-INSAM, 2020–2022). Il a également obtenu un Baccalauréat en Action Communication Commerciale au Lycée Technique National Omar Bongo, à Owendo, en 2018.';
			}
			if (/\b(gracepress|maintenance|incident|imprim|parc informatique)\b/.test(text)) {
				return 'De juillet 2025 à juin 2026, Maxime a été Technicien / Responsable Maintenance Informatique chez GracePress Printing à Libreville. Il a géré la maintenance préventive et corrective, les installations, le support et la formation des utilisateurs. Son CV indique une réduction de 20 % des incidents après amélioration de la gestion de la maintenance.';
			}
			if (/\b(m2is|technico|commercial|client|vente|salon)\b/.test(text)) {
				return 'En 2025, Maxime a effectué un stage technico-commercial chez M2IS à Libreville : présentation de produits, participation à des salons, conseil client, suivi de demandes et interventions techniques, ainsi que reporting.';
			}
			if (/\b(camerounaise des jeux|responsable informatique|douala|infrastructure)\b/.test(text)) {
				return 'De 2022 à 2024, Maxime a été Responsable Informatique à la Camerounaise des Jeux, à Douala. Ses missions mentionnées comprennent le suivi de l’infrastructure, l’installation, la configuration et la maintenance des équipements, ainsi que l’assistance et le support informatique.';
			}
			if (/\b(experiences?|parcours|emploi|poste|travail|professionnel|entreprise|carriere|cv)\b/.test(text)) {
				return 'Le parcours de Maxime comprend un poste de Responsable Informatique à la Camerounaise des Jeux à Douala (2022–2024), un stage technico-commercial chez M2IS à Libreville (2025) et une expérience de Technicien / Responsable Maintenance Informatique chez GracePress Printing à Libreville (juillet 2025–juin 2026).';
			}
			if (/\b(competences?|savoir-faire|expertises?|technologies?|php|laravel|developpement|developpeur|web|application|logiciel|programmation|code|base de donnees|reseaux?|securite|systemes?|maintenance|support|infographie|graphique|communication)\b/.test(text)) {
				return 'Ses compétences couvrent l’analyse et la conception de logiciels, le développement web et d’applications métiers (PHP / Laravel), les bases de données, les réseaux et systèmes, la sécurité des systèmes d’information, la maintenance informatique, le support aux utilisateurs, l’infographie et la communication professionnelle.';
			}
			if (/\b(disponible|disponibilite|salaire|pretention|age|permis|projet|realisation|portfolio)\b/.test(text)) {
				return 'Cette information n’est pas précisée dans les éléments de profil dont je dispose. Pour obtenir une réponse fiable, vous pouvez poser directement la question à Maxime via le formulaire de contact ou à maximeaurel.ma@gmail.com.';
			}

			return 'Je peux répondre à partir des informations connues sur le profil, les compétences, l’expérience, la formation et les coordonnées de Maxime. Je n’ai pas d’information vérifiée sur ce point ; vous pouvez lui écrire via le formulaire de contact pour en savoir plus.';
		}

		liaLauncher.addEventListener('click', function () {
			setLiaOpen(liaLauncher.getAttribute('aria-expanded') !== 'true');
		});

		liaClose.addEventListener('click', function () {
			setLiaOpen(false);
		});

		document.addEventListener('keydown', function (event) {
			if (event.key === 'Escape' && liaLauncher.getAttribute('aria-expanded') === 'true') {
				setLiaOpen(false);
			}
		});

		liaForm.addEventListener('submit', function (event) {
			event.preventDefault();
			var question = liaInput.value.trim();
			if (!question) {
				return;
			}

			addLiaMessage(question, 'visitor');
			liaInput.value = '';
			addLiaMessage(answerLia(question), 'assistant');
			liaInput.focus();
		});

		liaPanel.querySelectorAll('.lia-suggestions button').forEach(function (button) {
			button.addEventListener('click', function () {
				liaInput.value = button.textContent;
				liaForm.requestSubmit();
			});
		});
	}
});
