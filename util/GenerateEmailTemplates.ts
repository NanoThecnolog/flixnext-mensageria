import { NewAccountProps, ProblemTemplateProps, RequestProps } from '@types';
import mjml2html from 'mjml';



export function generateEmailTest(str: string) {
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-preview>Email de Teste</mj-preview>
    <mj-style inline="inline">
      .title { font-size: 24px; font-weight: bold; }
      .content { font-size: 16px; color: #555; }
    </mj-style>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Olá, este é um e-mail de teste!</mj-text>
        <mj-text>String enviada: ${str}</mj-text>
        <mj-button href="https://flixnext.netlify.app" background-color="#007bff">Clique aqui</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`

  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template promocional.")
  }
  return html;
}

export function generateEmailContent(userName: string): string {
  const mjmlTemplate = `
    <mjml>
  <mj-head>
    <mj-preview>A nossa plataforma mudou de endereço!</mj-preview>
    <mj-title>FlixNext - Mudança de Endereço</mj-title>
  </mj-head>
  <mj-body background-color="#121212">
    <mj-section background-color="#1f1f1f" padding="20px">
      <mj-column>
        <mj-text align="center" font-size="34px" color="#ffffff" font-family="Arial, sans-serif">
          A nossa plataforma mudou de endereço!
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#101010" border-radius="8px" padding="20px" css-class="box-shadow">
      <mj-column>
        <mj-text font-size="24px" color="#ffffff" font-family="Arial, sans-serif" font-weight="700" >
          Olá, <strong>${userName}</strong>!
        </mj-text>
        <mj-text font-size="20px" color="#d3d3d3" font-family="Arial, sans-serif" line-height="1.5" >
          Buscando melhorar a performance da plataforma, passamos por um processo de mudança de hospedagem e nosso site mudou.
        </mj-text>
        <mj-text font-size="20px" color="#ffffff" font-family="Arial, sans-serif">
          Nosso novo link de acesso:
        </mj-text>
        <mj-button href="https://flixnext.netlify.app" background-color="#f44336" color="#ffffff" font-size="18px" font-weight="700" padding="15px 30px">
          flixnext.netlify.app
        </mj-button>
        <mj-text font-size="20px" color="#d3d3d3" font-family="Arial, sans-serif" >
          Lembrando que esse é um link temporário. Em breve revelaremos o definitivo.
        </mj-text>
      </mj-column>
    </mj-section>

    <mj-section padding="20px">
      <mj-column>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          <strong>Contribua para o nosso trabalho, faça uma doação para o nosso site.</strong> Acesse a página de doações da nossa plataforma para mais informações: 
          <a href="https://flixnext.netlify.app/donate" style="color: #ffffff; text-decoration: none; font-weight: 700;">página de doação</a>
        </mj-text>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar. 
          Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
          <a href="https://flixnext.netlify.app/me" target="_blank" style="color: #f44336; text-decoration: none;">aqui</a>.
        </mj-text>
        <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          Este e-mail foi enviado de uma conta que apenas envia notificações e não pode receber respostas. Por favor não responda.
        </mj-text>
        <mj-text align="center" font-size="14px" color="#ccc" font-family="Arial, sans-serif">
          ©2025 FlixNext
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;
  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template de email.")
  }
  return html;
}

export function generateNewAccNotificationContent({ name, email, birthday, password }: NewAccountProps): string {
  const mjmlTemplate = `
    <mjml>
  <mj-head>
    <mj-attributes>
      <mj-all font-family="Arial, sans-serif" />
      <mj-text color="#ffffff" />
    </mj-attributes>
  </mj-head>
  <mj-body background-color="#121212">
    <mj-section>
      <mj-column>
        <!-- Header -->
        <mj-text align="center" font-size="34px" color="#ffffff" padding="20px" background-color="#000000">
          Uma nova conta foi criada!
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <!-- Text Content -->
        <mj-text align="center" font-size="26px" line-height="1.5" padding="20px">
          Nome: ${name}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Email: ${email}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Birthday: ${birthday}
        </mj-text>
        <mj-text align="center" font-size="26px" line-height="1.5" padding="0px">
          Senha: ${password}
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <!-- Footer -->
        <mj-text align="center" font-size="12px" color="#cccccc" padding="20px">
          ©2024 FlixNext
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>

`;
  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template de email.")
  }
  return html;
}

export function generateProblemTemplate({ title, description, tmdbId, season, episode, userId }: ProblemTemplateProps) {
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-preview>Notificação de Problema</mj-preview>
    <mj-style inline="inline">
      h4 {
        font-size: 16px;
        color: #4CAF50;
      }
      p {
        font-size: 14px;
        margin-bottom: 15px;
      }
      .footer p {
        font-size: 12px;
        color: #777;
        text-align: center;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#ffffff" padding="20px" border-radius="8px" box-shadow="0 4px 8px rgba(0, 0, 0, 0.1)">
      <mj-column>
        <mj-text align="center" font-size="20px" color="#ffffff" background-color="#4CAF50" padding="10px" border-radius="8px 8px 0 0">
          Notificação de Problema
        </mj-text>
        <mj-text font-size="16px" color="#4CAF50">Problema:</mj-text>
        <mj-text font-size="14px">${title}</mj-text>
        <mj-text font-size="16px" color="#4CAF50">Descrição:</mj-text>
        <mj-text font-size="14px">${description}</mj-text>
        <mj-text font-size="16px" color="#4CAF50">Id do título:</mj-text>
        <mj-text font-size="14px">${tmdbId}</mj-text>
        <mj-text font-size="16px" color="#4CAF50">Temporada:</mj-text>
        <mj-text font-size="14px">${season ? season : 'não é uma série'}</mj-text>
        <mj-text font-size="16px" color="#4CAF50">Episódio:</mj-text>
        <mj-text font-size="14px">${episode ? episode : 'não é uma série'}</mj-text>
        <mj-text font-size="16px" color="#4CAF50">ID do usuário:</mj-text>
        <mj-text font-size="14px">${userId}</mj-text>
        <mj-divider border-color="#dddddd" />
        <mj-text class="footer">Este é um email gerado automaticamente. Por favor, não responda.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `

  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template de email.")
  }
  return html;
}

export function generatePromotionalTemplate(name: string) {
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-preview>Feliz Ano Novo! 🎉 Descubra as novidades da FlixNext</mj-preview>
    <mj-style inline="inline">
      a { color: #d3d3d3; text-decoration: none; }
    </mj-style>
  </mj-head>

  <mj-body background-color="#121212">
    <mj-section background-color="#1f1f1f" padding="20px">
      <mj-column>
        <mj-text align="center" color="#fff" font-size="24px" font-weight="bold">Feliz Ano Novo!! 🎉</mj-text>
        <mj-image width="100%" border-radius="16px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.shutterstock.com%2Fimage-vector%2Fchinese-happy-new-year-2025-600nw-2529645459.jpg&f=1&nofb=1" />
      </mj-column>
    </mj-section>

    <mj-section background-color="#101010" border-radius="8px" padding="20px">
      <mj-column>
        <mj-text color="#d3d3d3" font-size="20px" font-weight="bold">Olá, <strong>${name}</strong>!</mj-text>
        <mj-text color="#d3d3d3" font-size="18px" align="center">O ano mal começou e já tem muita novidade chegando! Descubra os novos filmes e séries que estão vindo para começar 2025 com o pé direito!</mj-text>
      </mj-column>
    </mj-section>

    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#d3d3d3">Novidades em Séries:</mj-text>
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sgCHdBJ1w0vJNUrW1Sq90KEXv9j.jpg" href="https://flixnext.netlify.app/series/serie/85271" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/d09X5AzxBq4GkHL6j8pmkDPySfA.jpg" href="https://flixnext.netlify.app/series/serie/95396" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/kWllPMxt5pbtW4Rx0XbgbhcYGmP.jpg" href="https://flixnext.netlify.app/series/serie/118906" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/fJQhUBShLBPSKNzcGg1tf0kHMyo.jpg" href="https://flixnext.netlify.app/series/serie/241259" />
        <mj-button background-color="#921d1d" href="https://flixnext.netlify.app/series">Assista Agora</mj-button>
      </mj-column>
    </mj-section>
    
    <mj-section>
      <mj-column>
        <mj-text font-size="20px" font-weight="bold" color="#d3d3d3">Novidades em Filmes:</mj-text>
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/bYGXiAHUQqSp8SW3ql2lleZxQ5n.jpg" href="https://flixnext.netlify.app/watch/1156593" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/342bly9MqveL65TnEFzx8TTUxcL.jpg" href="https://flixnext.netlify.app/watch/558449" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/zX2UeAmF8XDBJM3sZ0RS0jLQ8Gg.jpg" href="https://flixnext.netlify.app/watch/845781" />
        <mj-image width="150px" border-radius="16px" src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg" href="https://flixnext.netlify.app/watch/533535" />
        <mj-button background-color="#921d1d" href="https://flixnext.netlify.app/#filmes">Assista Agora</mj-button>
      </mj-column>
    </mj-section>
    
    <mj-section background-color="#101010" padding="20px">
      <mj-column>
        <mj-text color="#ccc" font-size="14px" align="center">A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar. Se você não quiser mais receber nossos emails, modifique as configurações da sua conta <a href="https://flixnext.netlify.app/me">aqui</a>.</mj-text>
        <mj-text color="#ccc" font-size="14px" align="center">Este e-mail foi enviado de uma conta que apenas envia notificações e não pode receber respostas. Por favor, não responda.</mj-text>
        <mj-text color="#ccc" font-size="14px" align="center">©2025 FlixNext</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`

  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template promocional.")
  }
  return html;
}

export function generateRequestTemplate(data: RequestProps) {
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-preview>Solicitação de Conteúdo</mj-preview>
    <mj-style inline="inline">
      .container {
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .footer {
        font-size: 12px;
        color: #777;
        text-align: center;
        margin-top: 20px;
      }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section>
      <mj-column>
        <mj-text align="center" font-size="22px" color="#4CAF50" font-family="Arial">Solicitação de Conteúdo</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" border-radius="8px" padding="20px">
      <mj-column>
        <mj-text font-size="16px" color="#4CAF50" font-family="Arial">TMDBID:</mj-text>
        <mj-text font-size="14px" font-family="Arial" color="#333">${data.tmdbId}</mj-text>
        <mj-text font-size="16px" color="#4CAF50" font-family="Arial">Título:</mj-text>
        <mj-text font-size="14px" font-family="Arial" color="#333">${data.title}</mj-text>
        <mj-text font-size="16px" color="#4CAF50" font-family="Arial">SubTítulo:</mj-text>
        <mj-text font-size="14px" font-family="Arial" color="#333">${data.subtitle}</mj-text>
        <mj-text font-size="16px" color="#4CAF50" font-family="Arial">ID do Usuário:</mj-text>
        <mj-text font-size="14px" font-family="Arial" color="#333">${data.userId}</mj-text>
        <mj-text font-size="16px" color="#4CAF50" font-family="Arial">Nome do Usuário:</mj-text>
        <mj-text font-size="14px" font-family="Arial" color="#333">${data.userName}</mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="12px" color="#777" align="center">
          Este é um email gerado automaticamente. Por favor, não responda.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `
  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template promocional.")
  }
  return html;
}
export function generateRecoverTemplate(userName: string, token: string) {
  const siteLink = process.env.WEBSITE_LINK
  const RecoverLink = `${siteLink}/recover?token=${token}`
  const qrCode = "data:image/png;base64,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";
  const mjmlTemplate = `
  <mjml>
  <mj-head>
    <mj-preview>Redefinição de senha!</mj-preview>
  </mj-head>
  <mj-body background-color="#f4f4f4">
    <mj-section background-color="#007bff" padding="20px">
      <mj-column>
        <mj-text align="center" color="#ffffff" font-size="24px" font-family="Arial">Redefinição de senha!</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" border-radius="8px" padding="20px">
      <mj-column>
        <mj-text font-size="16px" font-family="Arial">Olá, ${userName}!</mj-text>
        <mj-text font-size="16px" font-family="Arial">Segue o link para redefinir sua senha!</mj-text>
        <mj-text font-size="16px" font-family="Arial"><a href="${RecoverLink}">Clique aqui!</a></mj-text>
        <mj-text font-size="16px" font-family="Arial">Caso não esteja conseguindo clicar no link, copie e cole esse endereço no navegador:</mj-text>
        <mj-text font-size="16px" font-family="Arial" word-break="break-all">${RecoverLink}</mj-text>
        <mj-text font-size="16px" font-family="Arial">Torne-se um apoiador! Faça uma doação para o projeto. Utilize o QRCode abaixo.</mj-text>
        <mj-image width="150px" src="${qrCode}" alt="69d28ddb-5447-44ec-997a-71be04038409" padding="10px" />
        <mj-text font-size="16px" font-family="Arial">Caso queira doar um valor diferente ou não esteja visualizando o QRCode, faça um pix utilizando a chave-pix abaixo.</mj-text>
        <mj-text font-size="16px" font-family="Arial">69d28ddb-5447-44ec-997a-71be04038409</mj-text>
        <mj-text font-size="16px" font-family="Arial">Atenciosamente,<br/>Equipe FlixNext</mj-text>
      </mj-column>
    </mj-section>
    <mj-section background-color="#f8f8f8" padding="20px">
      <mj-column>
        <mj-text font-size="12px" align="center" color="#666">Este é um email automático, por favor, não responda.</mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `
  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template promocional.")
  }
  return html;
}