// CHOKMAH — 3 colonnes uniquement : Prénoms bibliques, Lieux symboliques, Livres de la Bible
export const CATEGORIES = [
    'Prénoms bibliques',
    'Lieux et endroits symboliques',
    'Livres de la Bible'
]

export const grids = [
    // ═══════ A ═══════
    {
        letter: 'A', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques (AT ou NT) commençant par A.', hint: 'Patriarches, prophètes, apôtres...', expected: ['Abraham', 'Aaron', 'Adam', 'André', 'Ananias', 'Abigaïl', 'Abimélek', 'Aggée', 'Amos', 'Asaph', 'Aquila', 'Absalom', 'Anna', 'Amalek', 'Amnon', 'Adonija', 'Azaria', 'Asher', 'Achab', 'Atalie', 'Apollos', 'Agabus', 'Alexandre'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par A.', hint: 'Montagne, ville, jardin...', expected: ['Ararat', 'Antioche', 'Alexandrie', 'Aïalon', 'Armageddon', 'Atènes', 'Asie', 'Assos', 'Athènes', 'Arad'] },
            'Livres de la Bible':            { q: 'Citez deux livres de la Bible commençant par A.', hint: 'Prophètes mineurs ou NT', expected: ['Amos', 'Abdias', 'Actes', 'Actes des Apôtres', 'Apocalypse'] }
        }
    },
    {
        letter: 'A', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez un roi biblique et une femme biblique commençant par A.', hint: 'Achab, Atalie, Abigaïl...', expected: ['Achab', 'Atalie', 'Abigaïl', 'Anna', 'Aquila', 'Apphia', 'Aristobule', 'Asyncrite'] },
            'Lieux et endroits symboliques': { q: 'Nommez une ville où Paul a prêché commençant par A.', hint: 'Actes des Apôtres', expected: ['Antioche', 'Athènes', 'Asie', 'Assos', 'Amphipolis'] },
            'Livres de la Bible':            { q: 'Citez un prophète mineur et un livre du NT commençant par A.', hint: 'AT et NT mélangés', expected: ['Amos', 'Abdias', 'Actes', 'Apocalypse'] }
        }
    },

    // ═══════ B ═══════
    {
        letter: 'B', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par B.', hint: 'Apôtres, patriarches, femmes...', expected: ['Barnabas', 'Baruch', 'Balaam', 'Bath-Scheba', 'Benjamin', 'Bartimée', 'Boaz', 'Betsabée', 'Barsabbas', 'Barthélemy', 'Balak', 'Barjésus', 'Bérénice'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par B.', hint: 'Ville, fleuve, montagne...', expected: ['Bethléem', 'Béthanie', 'Béthel', 'Bethsaïda', 'Babylone', 'Betsabée', 'Beersheba', 'Bozra', 'Byblos'] },
            'Livres de la Bible':            { q: 'Citez le livre prophétique deutérocanonique commençant par B.', hint: 'Secrétaire de Jérémie', expected: ['Baruch'] }
        }
    },
    {
        letter: 'B', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez un personnage de l\'AT et un du NT commençant par B.', hint: 'Prophète, patriarche, apôtre...', expected: ['Boaz', 'Benjamin', 'Baruch', 'Balaam', 'Barnabas', 'Barthélemy', 'Bartimée'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville de naissance de Jésus et la ville de Lazare commençant par B.', hint: 'Luc 2 / Jean 11', expected: ['Bethléem', 'Béthanie', 'Bethsaïda', 'Béthel'] },
            'Livres de la Bible':            { q: 'Citez tous les livres de la Bible commençant par B.', hint: 'AT et NT', expected: ['Baruch', 'Baruch'] }
        }
    },

    // ═══════ C ═══════
    {
        letter: 'C', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par C.', hint: 'Espion, meurtrier, centurion...', expected: ['Caleb', 'Caïn', 'Corneille', 'Clopas', 'Cyrus', 'Céphas', 'Clément', 'Claude', 'Crispus', 'Chloé'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par C.', hint: 'Mont du défi d\'Élie, lieu de crucifixion...', expected: ['Carmel', 'Calvaire', 'Canaan', 'Corinthe', 'Chypre', 'Cédron', 'Capernaüm', 'Césarée', 'Cenchré', 'Colossacité'] },
            'Livres de la Bible':            { q: 'Citez deux épîtres pauliniennes commençant par C.', hint: 'Corinthiens + Colossiens', expected: ['Colossiens', '1 Corinthiens', '2 Corinthiens', 'Cantique des cantiques', '1 Chroniques', '2 Chroniques'] }
        }
    },
    {
        letter: 'C', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez un roi perse et un disciple commençant par C.', hint: 'Esdras 1 / NT', expected: ['Cyrus', 'Corneille', 'Céphas', 'Caleb', 'Caïn'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville de Pierre au bord de la mer et le torrent de la prière de Jésus.', hint: 'Capernaüm / Cédron', expected: ['Capernaüm', 'Cédron', 'Calvaire', 'Corinthe'] },
            'Livres de la Bible':            { q: 'Citez deux livres historiques commençant par C.', hint: 'Chroniques', expected: ['1 Chroniques', '2 Chroniques', 'Cantique des cantiques'] }
        }
    },

    // ═══════ D ═══════
    {
        letter: 'D', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par D.', hint: 'Roi, prophète, diacre...', expected: ['David', 'Daniel', 'Débora', 'Dalila', 'Demas', 'Dorcas', 'Dionysius', 'Diotrèphe'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par D.', hint: 'Conversion de Paul, région transjordanienne...', expected: ['Damas', 'Décapole', 'Dan', 'Dothan', 'Dor'] },
            'Livres de la Bible':            { q: 'Citez deux livres de la Bible commençant par D.', hint: 'Pentateuque + prophète', expected: ['Deutéronome', 'Daniel'] }
        }
    },
    {
        letter: 'D', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez la prophétesse juge et le prophète de la fosse aux lions commençant par D.', hint: 'Juges / Daniel', expected: ['Débora', 'Daniel', 'Dalila', 'David'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville syrienne où Paul fut aveuglé et la ville où naquit David.', hint: 'Actes 9 / 1 Samuel 17', expected: ['Damas', 'Bethléem'] },
            'Livres de la Bible':            { q: 'Nommez le 5ème livre de Moïse et le prophète de la vision des 4 bêtes.', hint: 'Pentateuque + vision apocalyptique', expected: ['Deutéronome', 'Daniel'] }
        }
    },

    // ═══════ E / É ═══════
    {
        letter: 'E', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux prophètes commençant par É ou E.', hint: 'Ésaïe, Élie, Élisée, Ézéchiel...', expected: ['Ésaïe', 'Élie', 'Élisée', 'Ézéchiel', 'Esdras', 'Étienne', 'Énoch', 'Ésaü', 'Éphraïm', 'Ève', 'Esther'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par E ou É.', hint: 'Jardin, vallée, ville...', expected: ['Éden', 'Éla', 'Emmaüs', 'Éphèse', 'Euphrate', 'Endor', 'Éréc'] },
            'Livres de la Bible':            { q: 'Citez deux livres de la Bible commençant par E ou É.', hint: 'Pentateuque, Prophètes ou NT', expected: ['Exode', 'Ézéchiel', 'Esdras', 'Éphésiens', 'Esther'] }
        }
    },
    {
        letter: 'E', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez la mère de Jésus et la reine perse commençant par E.', hint: 'NT / Livre d\'Esther', expected: ['Esther', 'Ève', 'Élisabeth', 'Éve'] },
            'Lieux et endroits symboliques': { q: 'Nommez le jardin de la création et la ville où Jean a été exilé commençant par des lettres voisines.', hint: 'Genèse / Apocalypse', expected: ['Éden', 'Éphèse', 'Emmaüs'] },
            'Livres de la Bible':            { q: 'Nommez le 2ème livre de Moïse et l\'épître de Paul aux Éphésiens.', hint: 'Exode + Éphésiens', expected: ['Exode', 'Éphésiens', 'Esdras', 'Esther', 'Ézéchiel'] }
        }
    },

    // ═══════ F ═══════
    {
        letter: 'F', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez un personnage biblique commençant par F.', hint: 'Apôtre, gouverneur romain...', expected: ['Félix', 'Festus', 'Fortunat', 'Fortunatus', 'Phoébé'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu ou région biblique commençant par F.', hint: 'Réfléchissez aux villes du NT', expected: ['Forum d\'Appius', 'Forteresse Antonia'] },
            'Livres de la Bible':            { q: 'Citez le livre de la femme courageuse dont le nom commence par F.', hint: 'Ce livre porte le nom d\'une femme', expected: ['aucun livre biblique canonique en F — répondre par un autre livre'] }
        }
    },

    // ═══════ G ═══════
    {
        letter: 'G', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par G.', hint: 'Juge, géant, ange, serviteur...', expected: ['Goliath', 'Guéhazi', 'Gédéon', 'Gabriel', 'Gamaliel', 'Gad', 'Guershom'] },
            'Lieux et endroits symboliques': { q: 'Nommez le jardin de la prière de Jésus et le lieu de la crucifixion commençant par G.', hint: 'Mt 26:36 / Mt 27:33', expected: ['Gethsémané', 'Golgotha', 'Galilée', 'Gabaon', 'Guiboa'] },
            'Livres de la Bible':            { q: 'Citez le premier livre de la Bible et l\'épître aux Galates.', hint: 'Création + Paul en Galatie', expected: ['Genèse', 'Galates'] }
        }
    },
    {
        letter: 'G', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez l\'ange de l\'annonciation et le géant philistin commençant par G.', hint: 'Luc 1 / 1 Samuel 17', expected: ['Gabriel', 'Goliath', 'Gédéon', 'Guéhazi'] },
            'Lieux et endroits symboliques': { q: 'Nommez la mer de G... en Israël et la montagne du défi d\'Élie.', hint: 'Genèse / 1 Rois 18', expected: ['Galilée', 'Golfe', 'Golgotha', 'Carmel'] },
            'Livres de la Bible':            { q: 'Nommez le premier livre de l\'AT et l\'épître paulinienne aux Galates.', hint: 'Genèse + Galates', expected: ['Genèse', 'Galates'] }
        }
    },

    // ═══════ H ═══════
    {
        letter: 'H', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par H.', hint: 'Roi, prophète, mère, général...', expected: ['Hananias', 'Hérode', 'Hannah', 'Hiram', 'Habacuc', 'Hagar', 'Osée', 'Heli', 'Hulda', 'Hophni'] },
            'Lieux et endroits symboliques': { q: 'Nommez la montagne de la mort d\'Aaron et la montagne de la Loi.', hint: 'Nb 20:22 / Ex 19', expected: ['Hor', 'Hébron', 'Horeb', 'Hermès'] },
            'Livres de la Bible':            { q: 'Citez le prophète mineur commençant par H dont le nom signifie "celui qui enlace".', hint: 'Petit prophète', expected: ['Habacuc', 'Aggée', 'Osée'] }
        }
    },
    {
        letter: 'H', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez la servante d\'Abraham et la mère de Samuel commençant par H.', hint: 'Genèse / 1 Samuel', expected: ['Hagar', 'Hannah', 'Hulda'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville antique aussi appelée Horeb et la cité de David (première capitale).', hint: 'Exode + 2 Samuel 5', expected: ['Horeb', 'Hébron', 'Hazor'] },
            'Livres de la Bible':            { q: 'Citez le prophète mineur "de l\'oracle" commençant par H.', hint: 'Habacuc', expected: ['Habacuc'] }
        }
    },

    // ═══════ I / Î ═══════
    {
        letter: 'I', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez deux personnages bibliques commençant par I.', hint: 'Fils d\'Abraham, juge, roi...', expected: ['Isaac', 'Isaïe', 'Israël', 'Izebel', 'Ira', 'Irijah'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu commençant par I dans les voyages de Paul.', hint: 'Actes 14', expected: ['Iconium', 'Illyrie'] },
            'Livres de la Bible':            { q: 'Nommez le grand prophète dont le nom commence par I ou É selon les traditions.', hint: 'Le prophète de la vision du trône', expected: ['Ésaïe', 'Ézéchiel'] }
        }
    },

    // ═══════ J ═══════
    {
        letter: 'J', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par J.', hint: 'Roi, apôtre, prophète, juge...', expected: ['Jacob', 'Joseph', 'Josué', 'Jésus', 'Jean', 'Jonas', 'Jérémie', 'Job', 'Juda', 'Joël', 'Josias', 'Joab', 'Jéthro', 'Jonathan', 'Jézabel', 'Judith'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par J.', hint: 'Ville sainte, fleuve, jardin...', expected: ['Jérusalem', 'Jéricho', 'Jourdain', 'Judée', 'Jaweh-Jireh'] },
            'Livres de la Bible':            { q: 'Citez deux livres de la Bible commençant par J.', hint: 'Historiques, prophètes, épîtres...', expected: ['Josué', 'Juges', 'Job', 'Joël', 'Jonas', 'Jean', '1 Jean', '2 Jean', '3 Jean', 'Jude', 'Judith'] }
        }
    },
    {
        letter: 'J', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le fils de Jacob et le précurseur de Jésus commençant par J.', hint: 'Genèse / Matthieu 3', expected: ['Joseph', 'Jean-Baptiste', 'Jacob', 'Josué'] },
            'Lieux et endroits symboliques': { q: 'Nommez la capitale d\'Israël et le fleuve du baptême de Jésus commençant par J.', hint: 'Ville sainte + fleuve', expected: ['Jérusalem', 'Jourdain', 'Jéricho'] },
            'Livres de la Bible':            { q: 'Nommez le livre du poème de la sagesse souffrante et l\'évangile du disciple bien-aimé commençant par J.', hint: 'Sagesse + Évangile', expected: ['Job', 'Jean'] }
        }
    },
    {
        letter: 'J', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez deux rois de Juda commençant par J.', hint: 'Josias, Joram, Josaphat...', expected: ['Josias', 'Josaphat', 'Joram', 'Joachim', 'Jojakin', 'Jonathan'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville de Zachée et le jardin de la prière de Jésus commençant par J.', hint: 'Luc 19 / Marc 14', expected: ['Jéricho', 'Jardin de Gethsémané'] },
            'Livres de la Bible':            { q: 'Citez deux prophètes mineurs commençant par J.', hint: 'Joël, Jonas...', expected: ['Joël', 'Jonas'] }
        }
    },

    // ═══════ K ═══════
    {
        letter: 'K', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez un personnage biblique dont le nom commence par K (ou Qoph en hébreu).', hint: 'Certains prénoms peuvent commencer par K dans certaines traductions', expected: ['Ketura', 'Kish', 'Ké'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique pouvant commencer par K.', hint: 'Traduction variée selon les versions', expected: ['Kadesh', 'Kiriath-Jéarim', 'Karnaim'] },
            'Livres de la Bible':            { q: 'Aucun livre canonique ne commence par K — nommez un livre commençant par la lettre suivante.', hint: 'L comme...', expected: ['Lévitique', 'Luc'] }
        }
    },

    // ═══════ L ═══════
    {
        letter: 'L', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par L.', hint: 'Frère de Marie, patriarche, évangéliste...', expected: ['Lazare', 'Lot', 'Laban', 'Loïs', 'Luc', 'Lévi', 'Lydie', 'Lysias'] },
            'Lieux et endroits symboliques': { q: 'Nommez une ville côtière et une chaîne de montagnes commençant par L.', hint: 'Lydde + Liban', expected: ['Liban', 'Lydde', 'Lystre', 'Laodicée', 'Lycie'] },
            'Livres de la Bible':            { q: 'Nommez le 3ème livre du Pentateuque et le 3ème Évangile commençant par L.', hint: 'Moïse + médecin évangéliste', expected: ['Lévitique', 'Luc'] }
        }
    },
    {
        letter: 'L', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez l\'évangéliste médecin et le ami de Paul commençant par L.', hint: 'Colossiens 4:14', expected: ['Luc', 'Lysias', 'Lévi', 'Loïs'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville de Paul lapidé et la ville de l\'église tiède de l\'Apocalypse commençant par L.', hint: 'Actes 14 / Ap 3', expected: ['Lystre', 'Laodicée'] },
            'Livres de la Bible':            { q: 'Nommez les deux livres de la Bible commençant par L.', hint: 'AT + NT', expected: ['Lévitique', 'Luc'] }
        }
    },

    // ═══════ M ═══════
    {
        letter: 'M', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par M.', hint: 'Législateur, prophètes, rois, femmes...', expected: ['Moïse', 'Marie', 'Mardochée', 'Michée', 'Matthieu', 'Manassé', 'Myriam', 'Malachie', 'Marthe', 'Marc', 'Melchisédek', 'Michal', 'Miriam', 'Mattathias'] },
            'Lieux et endroits symboliques': { q: 'Nommez la montagne de la Transfiguration et la mer traversée par Moïse.', hint: 'Mt 17 / Ex 14', expected: ['Hermon', 'Thabor', 'Morija', 'Mer Rouge', 'Moab', 'Madaba'] },
            'Livres de la Bible':            { q: 'Nommez le 1er Évangile et le dernier livre de l\'Ancien Testament commençant par M.', hint: 'Évangéliste + petit prophète', expected: ['Matthieu', 'Malachie', 'Michée'] }
        }
    },
    {
        letter: 'M', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez la sœur de Moïse et la mère de Jésus commençant par M.', hint: 'Ex 15 / Luc 1', expected: ['Myriam', 'Marie', 'Marthe', 'Michal'] },
            'Lieux et endroits symboliques': { q: 'Nommez la montagne du sacrifice d\'Isaac et le mont de la mort de Moïse commençant par M.', hint: 'Genèse 22 / Dt 34', expected: ['Morija', 'Nebo', 'Moab'] },
            'Livres de la Bible':            { q: 'Nommez deux prophètes mineurs commençant par M.', hint: 'AT', expected: ['Malachie', 'Michée'] }
        }
    },
    {
        letter: 'M', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le roi bâtisseur du Temple et son père commençant par M et D.', hint: 'Salomon est fils de...', expected: ['Marc', 'Matthieu', 'Moïse'] },
            'Lieux et endroits symboliques': { q: 'Nommez la mer intérieure d\'Israël et la ville de l\'annonciation commençant par M.', hint: 'Mer de Galilée + Luc 1', expected: ['Mer de Galilée', 'Mer Morte', 'Megiddo', 'Magdala'] },
            'Livres de la Bible':            { q: 'Nommez le 1er Évangile synoptique et le dernier prophète de l\'AT commençant par M.', hint: 'Matthieu / Malachie', expected: ['Matthieu', 'Malachie'] }
        }
    },

    // ═══════ N ═══════
    {
        letter: 'N', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par N.', hint: 'AT ou NT', expected: ['Noé', 'Nathan', 'Naomi', 'Naaman', 'Nicodème', 'Néhémie', 'Nephtali', 'Nicolas', 'Nymphas', 'Nimrod'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville galiléenne de Jésus et la capitale assyrienne commençant par N.', hint: 'Lc 4:16 / Jonas 1:2', expected: ['Nazareth', 'Ninive', 'Nébo', 'Naplouse'] },
            'Livres de la Bible':            { q: 'Citez le 4ème livre du Pentateuque et un petit prophète commençant par N.', hint: 'Désert + prophète de Ninive', expected: ['Nombres', 'Nahoum', 'Néhémie'] }
        }
    },
    {
        letter: 'N', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le patriarche de l\'arche et le gouverneur rebâtisseur de Jérusalem commençant par N.', hint: 'Genèse / Néhémie', expected: ['Noé', 'Néhémie', 'Nathan', 'Naaman'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville où Jonas fut envoyé et la ville d\'origine de Jésus commençant par N.', hint: 'Jonas / Matthieu', expected: ['Ninive', 'Nazareth'] },
            'Livres de la Bible':            { q: 'Nommez le livre qui relate les plaintes d\'Israël au désert et le prophète de Ninive commençant par N.', hint: 'Pentateuque + prophète mineur', expected: ['Nombres', 'Nahoum'] }
        }
    },

    // ═══════ O ═══════
    {
        letter: 'O', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez un personnage biblique commençant par O.', hint: 'Prophète, esclave, juge...', expected: ['Osée', 'Onésime', 'Obadyah', 'Othniel', 'Omri', 'Onesiphore'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par O.', hint: 'Mont des Oliviers...', expected: ['Oliviers (Mont des Oliviers)', 'Ophir', 'Ophel'] },
            'Livres de la Bible':            { q: 'Nommez le premier des douze prophètes mineurs commençant par O.', hint: 'Son nom signifie "sauvé"', expected: ['Osée'] }
        }
    },

    // ═══════ P ═══════
    {
        letter: 'P', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par P.', hint: 'Apôtres, gouverneurs, compagnons...', expected: ['Paul', 'Pierre', 'Pilate', 'Philippe', 'Philémon', 'Priscille', 'Phoébé', 'Prochor', 'Ptolémée', 'Potiphar'] },
            'Lieux et endroits symboliques': { q: 'Nommez l\'île de l\'exil de Jean et une ville de Paul commençant par P.', hint: 'Ap 1:9 / Ac 13:6', expected: ['Patmos', 'Paphos', 'Perge', 'Philippes', 'Ptolémaïs'] },
            'Livres de la Bible':            { q: 'Citez deux livres de sagesse ou poétiques commençant par P.', hint: 'Poésie hébraïque par excellence', expected: ['Psaumes', 'Proverbes'] }
        }
    },
    {
        letter: 'P', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le gouverneur romain de Judée et l\'apôtre des nations commençant par P.', hint: 'Matthieu 27 / Romains 1', expected: ['Pilate', 'Paul', 'Pierre', 'Philippe'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville fondée par Paul en Macédoine et l\'île de l\'Apocalypse commençant par P.', hint: 'Actes 16 / Ap 1', expected: ['Philippes', 'Patmos', 'Perge', 'Paphos'] },
            'Livres de la Bible':            { q: 'Nommez le livre des 150 cantiques et les leçons de sagesse salomoniennes commençant par P.', hint: 'Psaumes + Proverbes', expected: ['Psaumes', 'Proverbes'] }
        }
    },

    // ═══════ Q ═══════
    {
        letter: 'Q', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Aucun prénom biblique courant ne commence par Q — citez un prénom biblique contenant un Q.', hint: 'En latin ou en grec', expected: ['Aquila', 'Quinctius'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par Q ou contenant QU.', hint: 'Qumrân, Aquila...', expected: ['Qumrân'] },
            'Livres de la Bible':            { q: 'Nommez le livre hébraïque "Qohéleth" dans la Bible.', hint: 'Sagesse, vanité des vanités...', expected: ['Ecclésiaste', 'Qohéleth'] }
        }
    },

    // ═══════ R ═══════
    {
        letter: 'R', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par R.', hint: 'Moabite, matriarche, prostituée repentie...', expected: ['Ruth', 'Rachel', 'Rebecca', 'Roboam', 'Rahab', 'Ruben', 'Rébéca', 'Rehoboam'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par R.', hint: 'Rome, campement du désert...', expected: ['Rome', 'Rephidim', 'Rama', 'Rhodes'] },
            'Livres de la Bible':            { q: 'Nommez le livre de la Moabite fidèle et l\'épître de Paul à Rome commençant par R.', hint: 'Femme + épître', expected: ['Ruth', 'Romains'] }
        }
    },
    {
        letter: 'R', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez la belle-mère de Ruth et la femme de Isaac commençant par R.', hint: 'Ruth 1 / Genèse 24', expected: ['Naomi', 'Rebecca', 'Ruth', 'Rachel'] },
            'Lieux et endroits symboliques': { q: 'Nommez la capitale de l\'Empire et le campement d\'Israël à l\'eau amère commençant par R.', hint: 'Rome + Rephidim', expected: ['Rome', 'Rephidim'] },
            'Livres de la Bible':            { q: 'Nommez les deux livres de la Bible commençant par R.', hint: 'AT + NT', expected: ['Ruth', 'Romains'] }
        }
    },

    // ═══════ S ═══════
    {
        letter: 'S', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par S.', hint: 'Rois, juges, prophètes, femmes...', expected: ['Salomon', 'Saül', 'Samuel', 'Sara', 'Siméon', 'Samson', 'Silas', 'Stéphane', 'Silvain', 'Sosthène', 'Sopater', 'Simonie'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu biblique commençant par S.', hint: 'Montagne de la Loi, désert, ville...', expected: ['Sinaï', 'Samarie', 'Sichem', 'Silo', 'Sidon', 'Sardis', 'Smyrne', 'Sunem'] },
            'Livres de la Bible':            { q: 'Citez deux livres de la Bible commençant par S.', hint: 'Historique AT ou prophète', expected: ['1 Samuel', '2 Samuel', 'Sophonie', 'Sagesse'] }
        }
    },
    {
        letter: 'S', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le roi bâtisseur du Temple et le juge à la force dans les cheveux commençant par S.', hint: '1 Rois / Juges', expected: ['Salomon', 'Samson', 'Saül', 'Samuel'] },
            'Lieux et endroits symboliques': { q: 'Nommez la montagne de l\'alliance et la capitale du Nord d\'Israël commençant par S.', hint: 'Sinaï + Samarie', expected: ['Sinaï', 'Samarie', 'Sichem', 'Silo'] },
            'Livres de la Bible':            { q: 'Nommez les deux livres de Samuel et un prophète mineur commençant par S.', hint: 'AT — historique + prophétique', expected: ['1 Samuel', '2 Samuel', 'Sophonie'] }
        }
    },

    // ═══════ T ═══════
    {
        letter: 'T', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par T.', hint: 'Apôtre incrédule, disciple, compagnon de Paul...', expected: ['Thomas', 'Timothée', 'Tite', 'Théophile', 'Tamar', 'Tychique', 'Tryphène', 'Tryphose'] },
            'Lieux et endroits symboliques': { q: 'Nommez la montagne de la Transfiguration et le lac aussi appelé mer de T...', hint: 'Mt 17:1 / Jn 21:1', expected: ['Thabor', 'Tibériade', 'Tyr', 'Thrace'] },
            'Livres de la Bible':            { q: 'Citez deux épîtres pauliniennes commençant par T.', hint: 'Destinées à des collaborateurs', expected: ['1 Thessaloniciens', '2 Thessaloniciens', '1 Timothée', '2 Timothée', 'Tite'] }
        }
    },
    {
        letter: 'T', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez l\'apôtre incrédule et le jeune collaborateur de Paul commençant par T.', hint: 'Jean 20 / 1 Timothée', expected: ['Thomas', 'Timothée', 'Tite'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville phénicienne et le lac de Galilée commençant par T.', hint: 'Matthieu 15 / Jean 21', expected: ['Tyr', 'Tibériade', 'Thabor'] },
            'Livres de la Bible':            { q: 'Nommez les cinq épîtres commençant par T (Thessaloniciens ×2, Timothée ×2, Tite).', hint: 'Épîtres pastorales et de Paul', expected: ['1 Thessaloniciens', '2 Thessaloniciens', '1 Timothée', '2 Timothée', 'Tite'] }
        }
    },

    // ═══════ U ═══════
    {
        letter: 'U', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le mari de Bath-Scheba commençant par U.', hint: '2 Samuel 11', expected: ['Urie', 'Uriel', 'Uzziah'] },
            'Lieux et endroits symboliques': { q: 'Nommez le fleuve prophétique de l\'Apocalypse dont le nom commence par un son proche.', hint: 'Euphrate commence par E mais certains disent Ur', expected: ['Ur des Chaldéens', 'Euphrate'] },
            'Livres de la Bible':            { q: 'Aucun livre canonique ne commence par U — citez un livre contenant la lettre U.', hint: 'Ruth, Luc, Nombres...', expected: ['Ruth', 'Luc', 'Nombres', 'Juges'] }
        }
    },

    // ═══════ V ═══════
    {
        letter: 'V', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez un personnage commençant par V dans la Bible (même traduit du latin ou grec).', hint: 'Certains noms latins commencent par V', expected: ['Vasthi', 'Vespasien'] },
            'Lieux et endroits symboliques': { q: 'Nommez un lieu commençant par V dans la Bible.', hint: 'Vallée de...', expected: ['Vallée de Josaphat', 'Vallée d\'Éla', 'Vallée de Ben-Hinnom'] },
            'Livres de la Bible':            { q: 'Aucun livre canonique protestant ne commence par V — nommez un livre deutérocanonique contenant un V.', hint: 'Livres de la LXX', expected: ['Judith', 'Tobie', 'Maccabées'] }
        }
    },

    // ═══════ Z ═══════
    {
        letter: 'Z', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Citez deux personnages bibliques commençant par Z.', hint: 'Père de Jean-Baptiste, publicain, prophète...', expected: ['Zacharie', 'Zachée', 'Zabulon', 'Zérubabel', 'Zippora', 'Zimri', 'Zia'] },
            'Lieux et endroits symboliques': { q: 'Nommez la ville de Zachée et un lieu commençant par Z dans la Bible.', hint: 'Luc 19', expected: ['Jéricho (ville de Zachée)', 'Ziklag', 'Sion'] },
            'Livres de la Bible':            { q: 'Citez les deux prophètes mineurs commençant par Z.', hint: 'Avant-dernier + Sophonie → Zacharie + Z...', expected: ['Zacharie', 'Sophonie'] }
        }
    },
    {
        letter: 'Z', timerSeconds: 90,
        categories: {
            'Prénoms bibliques':             { q: 'Nommez le père de Jean-Baptiste et le publicain de Jéricho commençant par Z.', hint: 'Luc 1 / Luc 19', expected: ['Zacharie', 'Zachée'] },
            'Lieux et endroits symboliques': { q: 'Nommez la colline sainte de Jérusalem et le lieu du retour des exilés commençant par Z.', hint: 'Psaumes / Néhémie', expected: ['Sion', 'Ziklag'] },
            'Livres de la Bible':            { q: 'Nommez l\'avant-dernier prophète mineur commençant par Z.', hint: 'Visions nocturnes', expected: ['Zacharie'] }
        }
    }
]