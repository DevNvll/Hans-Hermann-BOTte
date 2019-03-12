class TagsHandler {
  constructor(client, serverId) {
    this.client = client
    this.serverId = serverId
  }

  addRole = (member, role) => {
    member
      .addRole(
        this.client.guilds
          .find(g => g.id === this.serverId)
          .roles.find(r => r.name === role).id
      )
      .catch(err => console.log(err))
  }

  removeRole = (member, role) => {
    member
      .removeRole(
        this.client.guilds
          .find(g => g.id === this.serverId)
          .roles.find(r => r.name === role).id
      )
      .catch(err => console.log(err))
  }

  handleTags = (member, { data }) => {
    //remove tag novato
    if (!member.roles.find(r => r.name === 'Novato')) return
    this.removeRole(member, 'Novato')
    //primeira pergunta. (se sabe inglês)
    if (data['1'] === 'b') this.addRole(member, 'Estrangeiro') // se não
    //pergunta sobre o estado
    if (data['2'] === 'a') this.addRole(member, 'Estatista')

    if (data['2'] === 'b' && data['6'] !== 'a' && data['5'] !== 'b')
      this.addRole(member, 'Anarquista')
    if (data['2'] === 'c') this.addRole(member, 'Sem Especificação')

    //estatistas

    if (data['3'] === 'a') this.addRole(member, 'Socialista')
    if (data['3'] === 'b') this.addRole(member, 'Minarquista')
    if (data['3'] === 'c') this.addRole(member, 'Liberal Clássico')
    if (data['3'] === 'd') this.addRole(member, 'Monarquista')

    //constituições

    if (data['4'] === 'a') this.addRole(member, 'Juspositivista')

    //definição de anarquia

    if (data['5'] === 'b') {
      this.removeRole(member, 'Anarquista')

      if (data['6'] !== 'd' && data['6'] !== 'b')
        this.addRole(member, 'Libertário')
    }
    //lei/norma

    if (data['6'] === 'a') {
      this.removeRole(member, 'Anarquista')
      this.addRole(member, 'Jusnaturalista')
    }

    if (data['6'] === 'b') {
      this.removeRole(member, 'Libertário')
      this.addRole(member, 'Tomista')
      this.addRole(member, 'Anarquista')
      this.addRole(member, 'Juspositivista')
    }

    if (data['6'] === 'c') {
      this.addRole(member, 'Jusnaturalista')
      this.addRole(member, 'Tradicionalista')
    }

    if (data['6'] === 'd') {
      this.removeRole(member, 'Libertário')
      this.addRole(member, 'Anarquista')
      this.addRole(member, 'Utilitarista')
    }

    if (data['6'] === 'e') {
      this.addRole(member, 'Jusnaturalista')
      this.addRole(member, 'Rothbardiano')
      this.removeRole(member, 'Anarquista')
    }
    //outras incliniações
    if (data['7'] === 'a') this.addRole(member, 'Individualista')
    if (data['7'] === 'b') this.addRole(member, 'Mutualista')
    if (data['7'] === 'c') this.addRole(member, 'Comunista')
    if (data['7'] === 'd') this.addRole(member, 'Tradicionalista')

    //perguntas complementares
    //aborto
    if (data['8'] === 'a') this.addRole(member, 'Pró Aborto')
    if (data['8'] === 'b') this.addRole(member, 'Anti Aborto')

    //PI

    if (data['9'] === 'a') this.addRole(member, 'Pró PI')
    if (data['9'] === 'b') this.addRole(member, 'Anti PI')

    //finais
    //estado/continente

    if (!data['10'].anon) {
      if (data['10'].estado) {
        this.addRole(member, '.' + data['10'].estado)
      }

      if (data['10'].continente) {
        this.addRole(member, '.' + data['10'].continente)
      }
    }
    //idade
    if (data['11'] === 'a') this.addRole(member, '-18')
    if (data['11'] === 'b') this.addRole(member, '+18')
  }
}

export default TagsHandler
