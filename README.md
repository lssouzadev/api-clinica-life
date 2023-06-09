## RFs (Requisitos funcionais)
- [x] deve ser possível se cadastrar;
- [x] deve ser possível se autenticar;
- [x] deve ser possível alterar a senha do usuário
- [x] deve ser possível obter o perfil de um usuário logado;
- [x] deve ser possível registrar um agendamento;
- [x] deve ser possível cadastrar uma sala de atendimento;
- [x] deve ser possível excluir um agendamento;
- [x] deve ser possível cadastrar um profissional;
- [x] deve ser possível excluir o cadastro de um profissional;
- [x] deve ser possível obter os agendamentos por profissional;
- [x] deve ser possível obter os agendamentos por data;
- [x] deve ser possível obter o histórico de atendimentos do paciente;
- [x] deve ser possível filtrar os agendamentos por sala e data;
- [ ] deve ser possível cadastrar atendimentos;
- [ ] deve ser possível editar atendimentos;
- [x] deve ser possível cadastrar tratamentos;
- [x] deve ser possível excluir tratamentos;
- [ ] deve ser possível listar todos os pacientes
- [ ] deve ser possível buscar um paciente
- [ ] deve ser possível listar todos os profissionais
- [ ] deve ser possível buscar um profissional

## RNs (Regras de negócio)

- [x] o usuário não deve poder cadastrar um agendamento fora do horário de trabalho;
- [x] o usuário não deve poder cadastrar dois agendamentos no mesmo horário e sala;
- [x] o usuário não deve poder cadastrar dois agendamentos no mesmo horário para o mesmo dentista;
- [x] o usuário não deve poder cadastrar um agendamento em uma sala onde o profissional não é cadastrado;
- [x] o usuário não deve poder cadastrar um novo profissional com o mesmo cpf;
- [x] o usuário não deve poder cadastrar um novo paciente com o mesmo cpf;
- [x] o profissional deve poder acessar os seus agendamentos;
- [x] o profissional não deve poder acessar outros agendamentos que não sejam os seus;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser ir identificado por um JTW (JSON Web Token);

46786575000182