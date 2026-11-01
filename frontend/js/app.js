 const PIECES = [
            ["salon", "Salon", 38],
            ["cuisine", "Cuisine", 110],
            ["chambre", "Chambre", 200],
            ["sdb", "Salle de bain", 185],
            ["bureau", "Bureau", 28],
            ["entree", "Entrée", 80]
        ];
        const info = Object.fromEntries(PIECES.map(p => [p[0], {
            nom: p[1],
            h: p[2]
        }]));
        const $ = s => document.querySelector(s);
        const el = (t, c, x) => {
            const e = document.createElement(t);
            if (c) e.className = c;
            if (x != null) e.textContent = x;
            return e
        };
        let projets = [],
            filtre = null,
            n = 0;
        PIECES.forEach(([id, nom]) => {
            for (let i = 1; i <= 2; i++) projets.push({
                id: n++,
                piece: id,
                titre: nom + ", exemple " + i,
                src: null
            })
        });
        PIECES.forEach(([id, nom]) => {
            const o = el("option", null, nom);
            o.value = id;
            $("#choix").append(o)
        });

        function rendre() {
            const plan = $("#plan");
            plan.replaceChildren();
            PIECES.forEach(([id, nom]) => {
                const k = projets.filter(p => p.piece === id).length;
                const b = el("button", "salle");
                b.style.gridArea = id;
                b.setAttribute("aria-pressed", filtre === id);
                b.append(el("span", "nom", nom), el("span", "nb", k + " sur 10 photos"));
                b.onclick = () => {
                    filtre = filtre === id ? null : id;
                    rendre()
                };
                plan.append(b);
            });
            plan.style.gridTemplateAreas = '"salon salon cuisine cuisine" "salon salon bureau sdb" "entree chambre chambre sdb"';
            $("#titre-galerie").textContent = filtre ? info[filtre].nom : "Toutes les pièces";
            $("#tout").hidden = !filtre;
            const g = $("#galerie");
            g.replaceChildren();
            const liste = projets.filter(p => !filtre || p.piece === filtre);
            liste.forEach(p => {
                const f = el("figure", "carte"),
                    v = el("div", "vue");
                if (p.src) {
                    const i = el("img");
                    i.src = p.src;
                    i.alt = p.titre;
                    v.append(i)
                } else {
                    v.style.setProperty("--h", info[p.piece].h);
                    v.append(el("span", null, "Photo à ajouter"))
                }
                const c = el("figcaption");
                c.append(el("strong", null, p.titre), el("span", null, info[p.piece].nom));
                const r = el("button", "retirer", "Retirer");
                r.onclick = () => {
                    projets = projets.filter(x => x !== p);
                    rendre()
                };
                f.append(v, c, r);
                g.append(f);
            });
            if (!liste.length) g.append(el("p", "vide", "Aucune réalisation dans cette pièce. Ajoutez la première depuis l’espace architecte."));
        }
        $("#tout").onclick = () => {
            filtre = null;
            rendre()
        };

        $("#mode").onclick = e => {
            const a = document.body.classList.toggle("admin");
            e.target.setAttribute("aria-pressed", a);
            e.target.textContent = a ? "Quitter l’espace architecte" : "Espace architecte";
            if (a) $("#ajouter").scrollIntoView();
            chat();
        };
        $("#ajout").onsubmit = e => {
            e.preventDefault();
            const d = new FormData(e.target),
                f = d.get("photo"),
                pc = d.get("piece");
            projets.push({
                id: n++,
                piece: pc,
                titre: d.get("titre").trim() || "Sans titre",
                src: f && f.size ? URL.createObjectURL(f) : null
            });
            e.target.reset();
            filtre = pc;
            rendre();
            $("#etat").textContent = "Réalisation ajoutée dans la pièce : " + info[pc].nom + ".";
        };

        const msgs = [{
            qui: "Architecte",
            txt: "Bonjour, décrivez-moi votre projet et la pièce concernée."
        }];
        const role = () => document.body.classList.contains("admin") ? "Architecte" : "Client";

        function chat() {
            const l = $("#fil");
            l.replaceChildren();
            msgs.forEach(m => {
                const d = el("div", "msg " + (m.qui === "Architecte" ? "archi" : "client"));
                d.append(el("b", null, m.qui), el("p", null, m.txt));
                l.append(d);
            });
            l.scrollTop = l.scrollHeight;
        }
        $("#envoi").onsubmit = e => {
            e.preventDefault();
            const t = $("#texte").value.trim();
            if (!t) return;
            msgs.push({
                qui: role(),
                txt: t
            });
            $("#texte").value = "";
            chat();
        };
        rendre();
        chat();