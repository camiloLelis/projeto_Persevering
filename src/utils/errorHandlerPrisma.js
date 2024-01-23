const handleErrorPrisma = (error, res) => {
    if (error.code === 'P2025') {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    } else if (error.code === 'P2002') {
        return res.status(400).json({ message: 'Email já cadastrado.' });
    } else {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
}

export default {
    handleErrorPrisma
};
