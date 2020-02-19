/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/state-in-constructor */
import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import Container from '../../components/Container';

import { Form, SubmitButton, List } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        // eslint-disable-next-line react/no-unused-state
        loading: false,
    };

    // Careggar o dados do LocalStorage
    componentDidMount() {
        const repositories = localStorage.getItem('repositories');

        if (repositories) {
            this.setState({ repositories: JSON.parse(repositories) });
        }
    }

    // Salvar os dados do LocalStorage

    componentDidUpdate(__, prevState) {
        const { repositories } = this.state;
        // eslint-disable-next-line no-empty
        if (prevState.repositories === repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    hadleSubmit = async e => {
        e.preventDefault(); // evitar que o usário faça refresh na página
        this.setState({ loading: true });
        const { newRepo, repositories } = this.state;

        const response = await api.get(`repos/${newRepo}`);

        const data = {
            name: response.data.full_name,
        };

        this.setState({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };

    render() {
        /* Quando se utiliza state todas as modificações sendo de css ou não dentro dos valores internos do componente,, por exemplo SubmitButton é um componente criado, você deve adicionar dentro do this.state ṕara funcionar. */
        const { newRepo, repositories, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.hadleSubmit}>
                    <input
                        type="text"
                        placeholder="Adicionar repositório"
                        // eslint-disable-next-line no-undef
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    {/* Adiciona no votão do IRIS */}
                    <SubmitButton loading={loading}>
                        {/* condição dentro do JSX  */}
                        {loading ? (
                            <FaSpinner color="#fff" size={14} />
                        ) : (
                            <FaPlus color="#fff" size={14} />
                        )}
                    </SubmitButton>
                </Form>
                <List>
                    {repositories.map(repository => (
                        <li key={repository.name}>
                            <span>{repository.name}</span>
                            <Link
                                to={`/repository/${encodeURIComponent(
                                    repository.name
                                )}`}
                            >
                                Detalhes
                            </Link>
                        </li>
                    ))}
                </List>
            </Container>
        );
    }
}
