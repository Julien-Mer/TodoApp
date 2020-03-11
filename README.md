Erwan LE FORESTIER
Julien MERIEAU

Le projet de la TodoApp android d'Erwan LE FORESTIER a été choisi pour être graphiquement reproduit.
Tout comme sur l'application android, les liens dans la description sont cliquables et ouvre une modal "WebView". (Attention nous n'avons pas cherché à contourner la sécurité des Frame options du header, donc certains liens ne fonctionneront pas dans l'iframe)
Nous avons utilisé angular-sanitize pour pouvoir afficher du code HTML à partir de variables.
Les tâches qui ont expirées deviennent rouges.


Réponses aux questions dans le TP 6:
- Laquelle des deux méthodes préférez-vous ?
Nous préférons la méthode avec AngularJs parce qu'elle permet une plus grande flexibilité avec le CSS, on peut aussi avoir un site par la même occasion et viser la plateforme iOS.

- Quels sont d’après vous les axes à approfondir pour ne laisser aucune faille potentielle concernant la sécurité de votre application ?
Tout d'abord il faudrait la compiler en version de production et non en debug. Nous pensons que si l'application requête sur une API et que l'API est sécurisée alors il n'y a pas réellement de problème de sécurité dans le stockage, mais si tout est stocké en local alors il faut se méfier des entrées utilisateurs.
Malheureusement en utilisant une API, l'application ne sera pas fonctionnelle hors connexion.
Dans le cas d'une utilisation avec une API ou non, il faut se méfier de l'entrée utilisateur pour éviter les injections SQL s'il y a une base de données ou les failles XSS par exemple.
Une autre faille dans l'application serait l'iframe, si par exemple le projet pouvait évoluer et qu'on pouvait voir les tâches des autres personnes, alors avec une iframe on pourrait rediriger le site, car nous n'avons pas empêché les redirections.