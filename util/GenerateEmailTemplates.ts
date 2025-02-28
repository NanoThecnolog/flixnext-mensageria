import { NewAccountProps, ProblemTemplateProps } from '@types';
import mjml2html from 'mjml';
import mjml from 'mjml'


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
  const { html, errors } = mjml(mjmlTemplate);
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
  const { html, errors } = mjml(mjmlTemplate);
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

  const { html, errors } = mjml(mjmlTemplate);
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

  const { html, errors } = mjml(mjmlTemplate);
  if (errors.length > 0) {
    console.error("Erro ao compilar o template MJML:", errors);
    throw new Error("Erro ao gerar o template promocional.")
  }
  return html;
}

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