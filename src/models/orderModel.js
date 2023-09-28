const conn = require('./connection');

const getAll = async () => {
  const [orders] = await conn.execute('SELECT * FROM pedido');

  return orders;
};

const createOrder = async (order) => {
  const { itens, valor_total, cliente_id, data_pedido } = order;

  console.log(itens, valor_total, cliente_id, data_pedido);

  const sqlQuery = 'INSERT INTO pedido (itens, valor_total, cliente_id, data_pedido) VALUES (?, ?, ?, ?)';

  const [createdOrder] = await conn.execute(sqlQuery, [itens, valor_total, cliente_id, data_pedido]);

  return { message: `Pedido n° ${createdOrder.insertId} criado` };
};

const addItem = async (params) => {
  const { orderId, productId} = params;

  //Atualiza os itens do pedido
  const [queryNomeProduto] = await conn.execute('SELECT nome FROM produto WHERE id = ?', [productId]);

  const nomeProduto = queryNomeProduto[0].nome;

  const [queryItensAtuais] =  await conn.execute('SELECT itens FROM pedido WHERE numero_pedido = ?', [orderId]); 
  
  const itensAtuais = queryItensAtuais[0].itens.split(', ');
  const novoItem = nomeProduto;

  itensAtuais.push(novoItem);

  const novosItens = itensAtuais.join(', ');
  
  await conn.execute('UPDATE pedido SET itens = ? WHERE numero_pedido = ?', [novosItens, orderId]);

  //Atualiza o valor total do pedido
  const [queryProductPrice] = await conn.execute('SELECT valor FROM produto WHERE id = ?', [productId]);

  const productPrice = parseFloat(queryProductPrice[0].valor);

  const [queryPrecoAtual] = await conn.execute('SELECT valor_total FROM pedido WHERE numero_pedido = ?', [orderId]);

  const precoAtual = parseFloat(queryPrecoAtual[0].valor_total);
  const novoValorTotal = precoAtual + productPrice;

  await conn.execute('UPDATE pedido SET valor_total = ? WHERE numero_pedido = ?', [novoValorTotal, orderId]);
  
  return { message: `${nomeProduto} adicionado ao pedido ${orderId}` };
};

const closeOrder = async (params) => {
  const { divisaoPessoas, orderId } = params;

  await conn.execute('UPDATE pedido SET status = ? WHERE numero_pedido = ?', ['Fechado', orderId]);

  const [queryValorTotal] = await conn.execute('SELECT valor_total FROM pedido WHERE numero_pedido = ?', [orderId]);
  const valorTotal = parseFloat(queryValorTotal[0].valor_total);
  
  if (divisaoPessoas > 4) {
    return { message: 'A conta só pode ser dividida em até 4 pessoas no máximo!' };
  } if (divisaoPessoas == 1) {
    return { message: 'O valor total do pedido é de R$' + valorTotal };
  } else {
    const valorDividido = (valorTotal / divisaoPessoas).toFixed(2);
    return { message: 'O valor para cada pessoa é de R$' + valorDividido };
  }
};

module.exports = {
  getAll,
  createOrder,
  addItem,
  closeOrder
};