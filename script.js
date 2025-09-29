document.addEventListener('DOMContentLoaded', () => {

    //-----------------------------------------------------
    // ESTADO DA APLICAÇÃO (BANCO DE DADOS FAKE)
    //-----------------------------------------------------
    let state = {
        produtos: [
            { id: 1, nome: "Mouse Gamer RGB", sku: "MG-RGB-001", categoriaId: 1, quantidade: 35, precoCompra: 75.50, precoVenda: 129.90, fornecedor: "Tech Imports" },
            { id: 2, nome: "Teclado Mecânico", sku: "TM-ABNT2-003", categoriaId: 1, quantidade: 20, precoCompra: 180.00, precoVenda: 349.90, fornecedor: "Distribuidora Hardware" },
            { id: 3, nome: "Monitor Ultrawide 29\"", sku: "MON-LG-29P", categoriaId: 2, quantidade: 15, precoCompra: 850.00, precoVenda: 1299.00, fornecedor: "Tech Imports" },
        ],
        categorias: [
            { id: 1, nome: "Periféricos", descricao: "Mouses, teclados, headsets, etc." },
            { id: 2, nome: "Monitores", descricao: "Monitores de vídeo de várias marcas e tamanhos." },
            { id: 3, nome: "Hardware", descricao: "Peças como placas de vídeo, processadores, memórias." },
        ],
        usuarios: [
            { id: 1, nome: "Clarisse (Admin)", login: "clarisse.admin", perfil: "Administrador" },
            { id: 2, nome: "Carlos Eduardo (Scrum)", login: "carlos.sm", perfil: "Administrador" },
           document.addEventListener('DOMContentLoaded', () => {

    //-----------------------------------------------------
    // ESTADO DA APLICAÇÃO (BANCO DE DADOS FAKE)
    //-----------------------------------------------------
    let state = {
        produtos: [
            { id: 1, nome: "Mouse Gamer RGB", sku: "MG-RGB-001", categoriaId: 1, quantidade: 35, precoCompra: 75.50, precoVenda: 129.90, fornecedor: "Tech Imports" },
            { id: 2, nome: "Teclado Mecânico", sku: "TM-ABNT2-003", categoriaId: 1, quantidade: 20, precoCompra: 180.00, precoVenda: 349.90, fornecedor: "Distribuidora Hardware" },
            { id: 3, nome: "Monitor Ultrawide 29\"", sku: "MON-LG-29P", categoriaId: 2, quantidade: 15, precoCompra: 850.00, precoVenda: 1299.00, fornecedor: "Tech Imports" },
        ],
        categorias: [
            { id: 1, nome: "Periféricos", descricao: "Mouses, teclados, headsets, etc." },
            { id: 2, nome: "Monitores", descricao: "Monitores de vídeo de várias marcas e tamanhos." },
            { id: 3, nome: "Hardware", descricao: "Peças como placas de vídeo, processadores, memórias." },
        ],
        usuarios: [
            { id: 1, nome: "Clarisse (Admin)", login: "clarisse.admin", perfil: "Administrador" },
            { id: 2, nome: "Carlos Eduardo (Scrum)", login: "carlos.sm", perfil: "Administrador" },
            { id: 3, nome: "Lorena (Dev)", login: "lorena.dev", perfil: "Operador" },
              { id: 4, nome: "Caio (Dev)", login: "caio.dev", perfil: "Operador" },
                { id: 5, nome: "Robson (Dev)", login: "lorena.dev", perfil: "Operador" },

            
        ],
        movimentacoes: [
            { id: 1, produtoId: 1, usuarioId: 1, tipo: "Entrada", quantidade: 10, data: "2025-09-27T10:00:00Z" },
            { id: 2, produtoId: 2, usuarioId: 3, tipo: "Saída", quantidade: 2, data: "2025-09-28T15:30:00Z" },
        ],
        editingId: null, // Guarda o ID do item que está sendo editado
    };

    //-----------------------------------------------------
    // FUNÇÕES DE RENDERIZAÇÃO (DESENHAR NA TELA)
    //-----------------------------------------------------

    function renderAll() {
        renderProdutos();
        renderCategorias();
        renderUsuarios();
        renderMovimentacoes();
        updateDashboard();
    }

    function updateDashboard() {
        document.getElementById('total-produtos').textContent = state.produtos.reduce((acc, p) => acc + p.quantidade, 0);
        document.getElementById('total-categorias').textContent = state.categorias.length;
        document.getElementById('total-usuarios').textContent = state.usuarios.length;
    }

    function renderProdutos() {
        const tableBody = document.getElementById('produtos-table-body');
        tableBody.innerHTML = '';
        state.produtos.forEach(produto => {
            const categoria = state.categorias.find(c => c.id === produto.categoriaId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.sku}</td>
                <td>${categoria ? categoria.nome : 'Sem Categoria'}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.precoVenda.toFixed(2).replace('.', ',')}</td>
                <td>${produto.fornecedor}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${produto.id}" data-type="produto"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${produto.id}" data-type="produto"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function renderCategorias() {
        const tableBody = document.getElementById('categorias-table-body');
        tableBody.innerHTML = '';
        state.categorias.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cat.nome}</td>
                <td>${cat.descricao}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${cat.id}" data-type="categoria"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${cat.id}" data-type="categoria"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    function renderUsuarios() {
        const tableBody = document.getElementById('usuarios-table-body');
        tableBody.innerHTML = '';
        state.usuarios.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.login}</td>
                <td>${user.perfil}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${user.id}" data-type="usuario"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${user.id}" data-type="usuario"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function renderMovimentacoes() {
        const tableBody = document.getElementById('movimentacoes-table-body');
        tableBody.innerHTML = '';
        state.movimentacoes.forEach(mov => {
            const produto = state.produtos.find(p => p.id === mov.produtoId);
            const usuario = state.usuarios.find(u => u.id === mov.usuarioId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(mov.data).toLocaleString('pt-BR')}</td>
                <td>${produto ? produto.nome : 'Produto não encontrado'}</td>
                <td><span class="status ${mov.tipo.toLowerCase()}">${mov.tipo}</span></td>
                <td>${mov.quantidade}</td>
                <td>${usuario ? usuario.nome.split(' ')[0] : 'Usuário não encontrado'}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    //-----------------------------------------------------
    // LÓGICA DO MODAL (ABRIR/FECHAR/MONTAR FORMULÁRIOS)
    //-----------------------------------------------------
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');

    function openModal() { modal.style.display = 'flex'; }
    function closeModal() { modal.style.display = 'none'; state.editingId = null; }
    
    document.querySelector('.close-button').addEventListener('click', closeModal);
    document.getElementById('btn-cancelar-modal').addEventListener('click', closeModal);

    function createFormFields(fields) {
        modalForm.innerHTML = '';
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            formGroup.appendChild(label);
            
            if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                select.name = field.id;
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    select.appendChild(option);
                });
                formGroup.appendChild(select);
            } else {
                const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
                input.type = field.type;
                input.id = field.id;
                input.name = field.id;
                if(field.placeholder) input.placeholder = field.placeholder;
                formGroup.appendChild(input);
            }
            modalForm.appendChild(formGroup);
        });
    }

    // Funções para abrir modais específicos
    document.getElementById('btn-novo-produto').addEventListener('click', () => {
        modalTitle.textContent = "Novo Produto";
        createFormFields([
            { id: 'nome', label: 'Nome do Produto', type: 'text' },
            { id: 'sku', label: 'SKU', type: 'text' },
            { id: 'categoriaId', label: 'Categoria', type: 'select', options: state.categorias.map(c => ({ value: c.id, text: c.nome })) },
            { id: 'quantidade', label: 'Quantidade em Estoque', type: 'number' },
            { id: 'precoVenda', label: 'Preço de Venda', type: 'number' },
            { id: 'fornecedor', label: 'Fornecedor', type: 'text' },
        ]);
        modalForm.dataset.type = 'produto';
        openModal();
    });

    document.getElementById('btn-nova-categoria').addEventListener('click', () => {
        modalTitle.textContent = "Nova Categoria";
        createFormFields([
            { id: 'nome', label: 'Nome da Categoria', type: 'text' },
            { id: 'descricao', label: 'Descrição', type: 'textarea' },
        ]);
        modalForm.dataset.type = 'categoria';
        openModal();
    });
    
    document.getElementById('btn-novo-usuario').addEventListener('click', () => {
        modalTitle.textContent = "Novo Usuário";
        createFormFields([
            { id: 'nome', label: 'Nome Completo', type: 'text' },
            { id: 'login', label: 'Login de Acesso', type: 'text' },
            { id: 'perfil', label: 'Perfil', type: 'select', options: [{value: "Administrador", text: "Administrador"}, {value: "Operador", text: "Operador"}] },
        ]);
        modalForm.dataset.type = 'usuario';
        openModal();
    });
    
    //-----------------------------------------------------
    // LÓGICA DE EVENTOS (CLICKS, SUBMISSÕES)
    //-----------------------------------------------------

    // Navegação entre as telas
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.dataset.target;
            
            document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
            document.getElementById(`${targetId}-view`).classList.add('active-view');
            
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Submissão do formulário do modal (Salvar)
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const type = e.target.dataset.type;

        if (state.editingId) { // Editando
            const index = state[type + 's'].findIndex(item => item.id === state.editingId);
            if(index !== -1) {
                const currentItem = state[type + 's'][index];
                // Manter o ID e converter valores numéricos
                state[type + 's'][index] = { ...currentItem, ...data, id: state.editingId };
                Object.keys(state[type + 's'][index]).forEach(key => {
                    if(!isNaN(data[key]) && data[key] !== '') state[type + 's'][index][key] = parseFloat(data[key]);
                });
            }
        } else { // Criando novo
            const newId = Math.max(...state[type + 's'].map(item => item.id), 0) + 1;
            const newItem = { ...data, id: newId };
            // Converter valores numéricos
            Object.keys(newItem).forEach(key => {
                if(!isNaN(data[key]) && data[key] !== '') newItem[key] = parseFloat(data[key]);
            });
            state[type + 's'].push(newItem);
        }
        
        renderAll();
        closeModal();
    });

    // Deleção e Edição
    document.querySelector('.main-content').addEventListener('click', e => {
        const target = e.target.closest('button');
        if (!target) return;
        
        const id = parseInt(target.dataset.id);
        const type = target.dataset.type;

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja excluir este item?`)) {
                state[type + 's'] = state[type + 's'].filter(item => item.id !== id);
                renderAll();
            }
        } else if (target.classList.contains('btn-edit')) {
            state.editingId = id;
            const item = state[type + 's'].find(i => i.id === id);
            
            // Simula o clique no botão de "novo" para montar o form e depois preenche
            if(type === 'produto') {
                document.getElementById('btn-novo-produto').click();
                modalTitle.textContent = "Editar Produto";
            } else if (type === 'categoria') {
                document.getElementById('btn-nova-categoria').click();
                modalTitle.textContent = "Editar Categoria";
            } else if (type === 'usuario') {
                document.getElementById('btn-novo-usuario').click();
                modalTitle.textContent = "Editar Usuário";
            }
            
            // Preenche os campos do formulário com os dados do item
            for(const key in item) {
                if(modalForm.elements[key]) {
                    modalForm.elements[key].value = item[key];
                }
            }
        }
    });

    //-----------------------------------------------------
    // INICIALIZAÇÃO
    //-----------------------------------------------------
    renderAll();
});
        ],
        movimentacoes: [
            { id: 1, produtoId: 1, usuarioId: 1, tipo: "Entrada", quantidade: 10, data: "2025-09-27T10:00:00Z" },
            { id: 2, produtoId: 2, usuarioId: 3, tipo: "Saída", quantidade: 2, data: "2025-09-28T15:30:00Z" },
        ],
        editingId: null, // Guarda o ID do item que está sendo editado
    };

    //-----------------------------------------------------
    // FUNÇÕES DE RENDERIZAÇÃO (DESENHAR NA TELA)
    //-----------------------------------------------------

    function renderAll() {
        renderProdutos();
        renderCategorias();
        renderUsuarios();
        renderMovimentacoes();
        updateDashboard();
    }

    function updateDashboard() {
        document.getElementById('total-produtos').textContent = state.produtos.reduce((acc, p) => acc + p.quantidade, 0);
        document.getElementById('total-categorias').textContent = state.categorias.length;
        document.getElementById('total-usuarios').textContent = state.usuarios.length;
    }

    function renderProdutos() {
        const tableBody = document.getElementById('produtos-table-body');
        tableBody.innerHTML = '';
        state.produtos.forEach(produto => {
            const categoria = state.categorias.find(c => c.id === produto.categoriaId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.sku}</td>
                <td>${categoria ? categoria.nome : 'Sem Categoria'}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.precoVenda.toFixed(2).replace('.', ',')}</td>
                <td>${produto.fornecedor}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${produto.id}" data-type="produto"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${produto.id}" data-type="produto"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function renderCategorias() {
        const tableBody = document.getElementById('categorias-table-body');
        tableBody.innerHTML = '';
        state.categorias.forEach(cat => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${cat.nome}</td>
                <td>${cat.descricao}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${cat.id}" data-type="categoria"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${cat.id}" data-type="categoria"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
    
    function renderUsuarios() {
        const tableBody = document.getElementById('usuarios-table-body');
        tableBody.innerHTML = '';
        state.usuarios.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.nome}</td>
                <td>${user.login}</td>
                <td>${user.perfil}</td>
                <td class="action-buttons">
                    <button class="btn-edit" data-id="${user.id}" data-type="usuario"><i class="fas fa-edit"></i></button>
                    <button class="btn-delete" data-id="${user.id}" data-type="usuario"><i class="fas fa-trash"></i></button>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }

    function renderMovimentacoes() {
        const tableBody = document.getElementById('movimentacoes-table-body');
        tableBody.innerHTML = '';
        state.movimentacoes.forEach(mov => {
            const produto = state.produtos.find(p => p.id === mov.produtoId);
            const usuario = state.usuarios.find(u => u.id === mov.usuarioId);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${new Date(mov.data).toLocaleString('pt-BR')}</td>
                <td>${produto ? produto.nome : 'Produto não encontrado'}</td>
                <td><span class="status ${mov.tipo.toLowerCase()}">${mov.tipo}</span></td>
                <td>${mov.quantidade}</td>
                <td>${usuario ? usuario.nome.split(' ')[0] : 'Usuário não encontrado'}</td>
            `;
            tableBody.appendChild(tr);
        });
    }

    //-----------------------------------------------------
    // LÓGICA DO MODAL (ABRIR/FECHAR/MONTAR FORMULÁRIOS)
    //-----------------------------------------------------
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');

    function openModal() { modal.style.display = 'flex'; }
    function closeModal() { modal.style.display = 'none'; state.editingId = null; }
    
    document.querySelector('.close-button').addEventListener('click', closeModal);
    document.getElementById('btn-cancelar-modal').addEventListener('click', closeModal);

    function createFormFields(fields) {
        modalForm.innerHTML = '';
        fields.forEach(field => {
            const formGroup = document.createElement('div');
            formGroup.className = 'form-group';
            
            const label = document.createElement('label');
            label.htmlFor = field.id;
            label.textContent = field.label;
            formGroup.appendChild(label);
            
            if (field.type === 'select') {
                const select = document.createElement('select');
                select.id = field.id;
                select.name = field.id;
                field.options.forEach(opt => {
                    const option = document.createElement('option');
                    option.value = opt.value;
                    option.textContent = opt.text;
                    select.appendChild(option);
                });
                formGroup.appendChild(select);
            } else {
                const input = document.createElement(field.type === 'textarea' ? 'textarea' : 'input');
                input.type = field.type;
                input.id = field.id;
                input.name = field.id;
                if(field.placeholder) input.placeholder = field.placeholder;
                formGroup.appendChild(input);
            }
            modalForm.appendChild(formGroup);
        });
    }

    // Funções para abrir modais específicos
    document.getElementById('btn-novo-produto').addEventListener('click', () => {
        modalTitle.textContent = "Novo Produto";
        createFormFields([
            { id: 'nome', label: 'Nome do Produto', type: 'text' },
            { id: 'sku', label: 'SKU', type: 'text' },
            { id: 'categoriaId', label: 'Categoria', type: 'select', options: state.categorias.map(c => ({ value: c.id, text: c.nome })) },
            { id: 'quantidade', label: 'Quantidade em Estoque', type: 'number' },
            { id: 'precoVenda', label: 'Preço de Venda', type: 'number' },
            { id: 'fornecedor', label: 'Fornecedor', type: 'text' },
        ]);
        modalForm.dataset.type = 'produto';
        openModal();
    });

    document.getElementById('btn-nova-categoria').addEventListener('click', () => {
        modalTitle.textContent = "Nova Categoria";
        createFormFields([
            { id: 'nome', label: 'Nome da Categoria', type: 'text' },
            { id: 'descricao', label: 'Descrição', type: 'textarea' },
        ]);
        modalForm.dataset.type = 'categoria';
        openModal();
    });
    
    document.getElementById('btn-novo-usuario').addEventListener('click', () => {
        modalTitle.textContent = "Novo Usuário";
        createFormFields([
            { id: 'nome', label: 'Nome Completo', type: 'text' },
            { id: 'login', label: 'Login de Acesso', type: 'text' },
            { id: 'perfil', label: 'Perfil', type: 'select', options: [{value: "Administrador", text: "Administrador"}, {value: "Operador", text: "Operador"}] },
        ]);
        modalForm.dataset.type = 'usuario';
        openModal();
    });
    
    //-----------------------------------------------------
    // LÓGICA DE EVENTOS (CLICKS, SUBMISSÕES)
    //-----------------------------------------------------

    // Navegação entre as telas
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const targetId = link.dataset.target;
            
            document.querySelectorAll('.view').forEach(view => view.classList.remove('active-view'));
            document.getElementById(`${targetId}-view`).classList.add('active-view');
            
            document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Submissão do formulário do modal (Salvar)
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        const type = e.target.dataset.type;

        if (state.editingId) { // Editando
            const index = state[type + 's'].findIndex(item => item.id === state.editingId);
            if(index !== -1) {
                const currentItem = state[type + 's'][index];
                // Manter o ID e converter valores numéricos
                state[type + 's'][index] = { ...currentItem, ...data, id: state.editingId };
                Object.keys(state[type + 's'][index]).forEach(key => {
                    if(!isNaN(data[key]) && data[key] !== '') state[type + 's'][index][key] = parseFloat(data[key]);
                });
            }
        } else { // Criando novo
            const newId = Math.max(...state[type + 's'].map(item => item.id), 0) + 1;
            const newItem = { ...data, id: newId };
            // Converter valores numéricos
            Object.keys(newItem).forEach(key => {
                if(!isNaN(data[key]) && data[key] !== '') newItem[key] = parseFloat(data[key]);
            });
            state[type + 's'].push(newItem);
        }
        
        renderAll();
        closeModal();
    });

    // Deleção e Edição
    document.querySelector('.main-content').addEventListener('click', e => {
        const target = e.target.closest('button');
        if (!target) return;
        
        const id = parseInt(target.dataset.id);
        const type = target.dataset.type;

        if (target.classList.contains('btn-delete')) {
            if (confirm(`Tem certeza que deseja excluir este item?`)) {
                state[type + 's'] = state[type + 's'].filter(item => item.id !== id);
                renderAll();
            }
        } else if (target.classList.contains('btn-edit')) {
            state.editingId = id;
            const item = state[type + 's'].find(i => i.id === id);
            
            // Simula o clique no botão de "novo" para montar o form e depois preenche
            if(type === 'produto') {
                document.getElementById('btn-novo-produto').click();
                modalTitle.textContent = "Editar Produto";
            } else if (type === 'categoria') {
                document.getElementById('btn-nova-categoria').click();
                modalTitle.textContent = "Editar Categoria";
            } else if (type === 'usuario') {
                document.getElementById('btn-novo-usuario').click();
                modalTitle.textContent = "Editar Usuário";
            }
            
            // Preenche os campos do formulário com os dados do item
            for(const key in item) {
                if(modalForm.elements[key]) {
                    modalForm.elements[key].value = item[key];
                }
            }
        }
    });

    //-----------------------------------------------------
    // INICIALIZAÇÃO
    //-----------------------------------------------------
    renderAll();
});