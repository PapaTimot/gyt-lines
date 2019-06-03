# gyt-lines

## Description

Le but de ce projet était d'implémenter le jeu Lines Of Actions(https://fr.wikipedia.org/wiki/Lines_of_Action) et de réaliser une ou plusieurs IA pour ce jeu. Nous avons décider de faire ce projet en Angular, afin de pouvoir ensuite rendre disponible le résultat de notre projet sur une Github Page.

Dans ce projet, nous avons développé trois Intelligences Artificielles. La première IA, est simplement un choix aléatoire parmis les coups autorisés par les règles. Dans la seconde IA, nous avons essayer de mettre en place un fonctionnement plus "intelligent" à l'aide d'heuristiques. Cette deuxième IA, va calculer un arbre des possibilités de profondeur réduite et à l'aide des heuristiques, donner une valeur correspondant à l'avantage que nous procure ce plateau et ensuite effectuer un algorithme Min-Max sur cet arbre. Les heuristiques utilisés dans cette IA sont les plus basiques. On a notamment, un calcul du "centre de masse" des pions d'un joueur(c'est a dire le point d'arrivé qui minimise les distances parcourue ), le calcul des "menaces"(disposition dans la quelle un mouvement peux faire gagner un des joueur). Pour la troisième IA, nous sommes partis de la seconde et nous avons ajouté deux heuristiques suplémentaires. La première, concernait le fait de "manger" un pion adverse. En effet, cette action aurais pour conséquence de diminuer le nombre de pièces de l'adversaire, ce qui rendrais plus facile la tâche de relier ces pion. nous avons donc pris ça en compte dans le calcul de l'avantage, tout en s'assurant que "manger" reste une option valide quand elle est intéressante(empêcher l'adversaire de gagner par exemple). La seconde heuristique concerne le nombre de groupes formés par les pions. En effet, casser un groupe est généralement un mauvais choix(encore une fois il existe des exeptions), nous avons donc aussi ajouté le nombre de groupe au paramètres à prendre en compte dans le calcul de l'avantage.

## Auteurs :

* Gwendal Jouneaux
* Yoann Breton
* Timothée Schneider-Maunoury

## Structure :

* Tout le code source du projet Angular est disponible dans le `gyt-lines-front`
* Le jeux est disponible ici : https://papatimot.github.io/gyt-lines/
