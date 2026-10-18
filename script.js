
const documentos = [
    {
        id: "identidade",
        titulo: "Carteira de Identidade",
        descricao: "Identificação pessoal fictícia",
        categoria: "Identificação",
        icone: "ID",
        numero: "DEMO-ID-2048",
        nome: "Helena Fictícia",
        nascimento: "15/04/2004",
        emissao: "10/01/2026"
    },
    {
        id: "cnh",
        titulo: "Carteira de Habilitação",
        descricao: "Modelo ilustrativo de habilitação",
        categoria: "Trânsito",
        icone: "CNH",
        numero: "DEMO-CNH-7351",
        nome: "Helena Fictícia",
        nascimento: "15/04/2004",
        emissao: "12/02/2026"
    },
    {
        id: "trabalho",
        titulo: "Carteira de Trabalho",
        descricao: "Dados profissionais de exemplo",
        categoria: "Trabalho",
        icone: "CT",
        numero: "DEMO-CT-9182",
        nome: "Helena Fictícia",
        nascimento: "15/04/2004",
        emissao: "05/03/2026"
    },
    {
        id: "sus",
        titulo: "Cartão de Saúde",
        descricao: "Modelo fictício de cartão de saúde",
        categoria: "Saúde",
        icone: "SUS",
        numero: "DEMO-SAUDE-4260",
        nome: "Helena Fictícia",
        nascimento: "15/04/2004",
        emissao: "08/04/2026"
    }
];

const listView = document.getElementById("listView");
const detailView = document.getElementById("detailView");
const documentGrid = document.getElementById("documentGrid");

const breadcrumbCurrent =
    document.getElementById("breadcrumbCurrent");

const homeLink = document.getElementById("homeLink");
const breadcrumbHome = document.getElementById("breadcrumbHome");
const backButton = document.getElementById("backButton");
const returnButton = document.getElementById("returnButton");


function renderizarDocumentos() {
    documentGrid.replaceChildren();

    documentos.forEach((doc) => {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "document-card";
        card.setAttribute(
            "aria-label",
            `Abrir demonstração: ${doc.titulo}`
        );

        const icon = document.createElement("span");
        icon.className = "card-icon";
        icon.textContent = doc.icone;
        icon.setAttribute("aria-hidden", "true");

        const content = document.createElement("span");
        content.className = "card-content";

        const title = document.createElement("h3");
        title.textContent = doc.titulo;

        const description = document.createElement("p");
        description.textContent = doc.descricao;

        const link = document.createElement("span");
        link.className = "card-link";
        link.textContent = "Ver demonstração →";

        content.append(title, description, link);

        const arrow = document.createElement("span");
        arrow.className = "card-arrow";
        arrow.textContent = "›";
        arrow.setAttribute("aria-hidden", "true");

        card.append(icon, content, arrow);

        card.addEventListener("click", () => {
            abrirDocumento(doc.id);
        });

        documentGrid.appendChild(card);
    });
}

function abrirDocumento(id) {
    const doc = documentos.find((item) => item.id === id);

    if (!doc) {
        mostrarLista();
        return;
    }

    document.getElementById("detailTitle").textContent =
        doc.titulo;

    document.getElementById("detailDescription").textContent =
        doc.descricao;

    document.getElementById("previewIcon").textContent =
        doc.icone;

    document.getElementById("previewTitle").textContent =
        doc.titulo;

    document.getElementById("personName").textContent =
        doc.nome;

    document.getElementById("documentNumber").textContent =
        doc.numero;

    document.getElementById("birthDate").textContent =
        doc.nascimento;

    document.getElementById("issueDate").textContent =
        doc.emissao;

    document.getElementById("photoInitials").textContent = "HF";

    document.getElementById("documentTypeFooter").textContent =
        doc.categoria.toUpperCase();

    document.getElementById("infoCategory").textContent =
        doc.categoria;

    gerarPadraoIlustrativo(doc.id);

    listView.hidden = true;
    detailView.hidden = false;

    breadcrumbCurrent.textContent = doc.titulo;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function mostrarLista() {
    detailView.hidden = true;
    listView.hidden = false;

    breadcrumbCurrent.textContent = "Meus documentos";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function gerarPadraoIlustrativo(id) {
    const area = document.getElementById("qrCode");
    area.replaceChildren();

    const tamanho = 13;

    
    let semente = 0;

    for (const caractere of id) {
        semente = (semente * 31 + caractere.charCodeAt(0)) % 997;
    }

    function fazParteDoMarcador(x, y, inicioX, inicioY) {
        const dx = x - inicioX;
        const dy = y - inicioY;

        if (dx < 0 || dx > 2 || dy < 0 || dy > 2) {
            return false;
        }

        return (
            dx === 0 || dx === 2 ||
            dy === 0 || dy === 2 ||
            (dx === 1 && dy === 1)
        );
    }

    for (let y = 0; y < tamanho; y++) {
        for (let x = 0; x < tamanho; x++) {
            const celula = document.createElement("span");
            celula.className = "qr-cell";

            const marcador =
                fazParteDoMarcador(x, y, 0, 0) ||
                fazParteDoMarcador(x, y, 10, 0) ||
                fazParteDoMarcador(x, y, 0, 10);
            const valor = (x * 17 + y * 29 + semente) % 7;

            if (marcador || valor < 3) {
                celula.classList.add("dark");
            }

            area.appendChild(celula);
        }
    }
}

homeLink.addEventListener("click", (event) => {
    event.preventDefault();
    mostrarLista();
});

breadcrumbHome.addEventListener("click", (event) => {
    event.preventDefault();
    mostrarLista();
});

backButton.addEventListener("click", mostrarLista);
returnButton.addEventListener("click", mostrarLista);

renderizarDocumentos();
