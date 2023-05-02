## RFs (Requisitos funcionais)
- [ ] deve ser possível se cadastrar;
- [ ] deve ser possível se autenticar;
- [ ] deve ser possível alterar a senha do usuário
- [ ] deve ser possível obter o perfil de um usuário logado;
- [x] deve ser possível registrar um agendamento;
- [x] deve ser possível cadastrar uma sala de atendimento;
- [x] deve ser possível excluir um agendamento;
- [x] deve ser possível cadastrar um profissional;
- [ ] deve ser possível excluir o cadastro de um profissional;
- [x] deve ser possível obter os agendamentos por profissional;
- [ ] deve ser possível obter os agendamentos por data;
- [ ] deve ser possível obter o histórico de atendimentos do paciente;
- [ ] deve ser possível filtrar os agendamentos por sala;
- [ ] deve ser possível cadastrar procedimentos;
- [ ] deve ser possível cadastrar atendimentos;
- [ ] deve ser possível excluir procedimentos;
- [ ] deve ser editar atendimentos;

## RNs (Regras de negócio)

- [x] o usuário não deve poder cadastrar um agendamento fora do horário de trabalho;
- [x] o usuário não deve poder cadastrar dois agendamentos no mesmo horário e sala;
- [x] o usuário não deve poder cadastrar dois agendamentos no mesmo horário para o mesmo dentista;
- [x] o usuário não deve poder cadastrar um agendamento em uma sala onde o profissional não é cadastrado;
- [ ] o usuário não deve poder cadastrar um novo profissional com o mesmo cpf;
- [ ] o usuário não deve poder cadastrar um novo paciente com o mesmo cpf;
- [ ] o profissional deve poder acessar os seus agendamentos;
- [ ] o profissional não deve poder acessar outros agendamentos que não sejam os seus;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser ir identificado por um JTW (JSON Web Token);

