import { Injectable } from "@nestjs/common";
import { ActivatedAccProps, NewAccountProps, NewAccountUserProps, ProblemTemplateProps, RequestProps } from "@types";
import mjml2html from "mjml";
import { NewUserDTO } from "src/dto/email.dto";

@Injectable()
export class Template {
    private webLink: string
    constructor() {
        this.webLink = process.env.WEBSITE_LINK || ""
        if (!this.webLink) throw new Error("variavel de ambiente nao configurada")
    }
    generateEmailTest(str: string): string {
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
                    <mj-button href=${this.webLink} background-color="#007bff">Clique aqui</mj-button>
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

    generateEmailContent(userName: string): string {
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
                    <mj-button href=${this.webLink} background-color="#f44336" color="#ffffff" font-size="18px" font-weight="700" padding="15px 30px">
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
                    <a href="${this.webLink}/donate" style="color: #ffffff; text-decoration: none; font-weight: 700;">página de doação</a>
                    </mj-text>
                    <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
                    A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar. 
                    Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
                    <a href="${this.webLink}/me" target="_blank" style="color: #f44336; text-decoration: none;">aqui</a>.
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

    generateNewAccUserNotify(data: NewAccountUserProps): string {

        const mjmlTemplate = `
            <mjml>
            <mj-head>
                <mj-preview>Obrigado por criar sua conta na FlixNext!</mj-preview>
            </mj-head>
            <mj-body background-color="#f4f4f4">
                
                <mj-section background-color="#007bff">
                <mj-column>
                    <mj-text align="center" color="#ffffff" font-size="24px" font-family="Arial, sans-serif">
                    Obrigado por criar sua conta na FlixNext!
                    </mj-text>
                </mj-column>
                </mj-section>
            
                <mj-section background-color="#ffffff" border-radius="8px" padding="20px">
                <mj-column>
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Olá, ${data.name}!
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Sua conta na nossa plataforma foi criada com sucesso!
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Para completar seu cadastro, <a href="${this.webLink}/ativando-conta/${data.id}" style="color: #007bff; text-decoration: none;">clique aqui</a> e ative sua conta.
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Caso não esteja conseguindo clicar no link, copie e cole esse endereço no navegador:
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif" color="#007bff">
                    ${this.webLink}/ativando-conta/${data.id}
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Torne-se um apoiador! Faça uma doação para o projeto. Utilize o QRCode abaixo.
                    </mj-text>
            
                    <mj-image width="150px" src="cid:qrcode@pix" alt="QrCode Pix" />
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Caso queira doar um valor diferente, faça um pix utilizando a chave aleatória: 
                    <strong>69d28ddb-5447-44ec-997a-71be04038409</strong>
                    </mj-text>
            
                    <mj-text font-size="16px" font-family="Arial, sans-serif">
                    Atenciosamente,<br/>Equipe FlixNext
                    </mj-text>
                </mj-column>
                </mj-section>
            
                <mj-section background-color="#f8f8f8">
                <mj-column>
                    <mj-text align="center" font-size="12px" color="#666" font-family="Arial, sans-serif">
                    Este é um email automático, por favor, não responda.
                    </mj-text>
                </mj-column>
                </mj-section>
            
            </mj-body>
            </mjml>
            `
        const { html, errors } = mjml2html(mjmlTemplate);
        if (errors.length > 0) {
            console.error("Erro ao compilar o template MJML:", errors);
            throw new Error("Erro ao gerar o template de email para novo user.")
        }
        return html;
    }

    generateNewAccNotificationContent({ name, email, birthday, password }: NewUserDTO): string {
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

    generateActivatedConfirmation(data: ActivatedAccProps) {

        const mjmlTemplate = `
            <mjml>
            <mj-body>
                <mj-section background-color="#242424">
                <mj-column>
                    <mj-text font-family="Arial, sans-serif" padding="20px" background-color="#007bff" color="#ffffff" font-size="24px" align="center">
                    Obrigado por Ativar sua conta na FlixNext!
                    </mj-text>
                </mj-column>
                </mj-section>
            
                <mj-section>
                <mj-column>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="20px">
                    Olá, ${data.name}!
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="20px">
                    Sua conta na FlixNext foi ativada com sucesso!
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="10px">
                    Agora você pode fazer login e assistir aos seus filmes e séries favoritos! <a href="${this.webLink}/login">Clique aqui!</a>
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="10px">
                    Caso não esteja conseguindo clicar no link, copie e cole esse endereço no navegador:
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="10px">
                    ${this.webLink}/login
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="20px">
                    Torne-se um apoiador! Faça uma doação para o projeto. Utilize o QRCode abaixo.
                    </mj-text>
                    <mj-image width="150px" src="cid:qrcode@pix" alt="QrCode Pix" padding="10px" align="center"/>
                    <mj-text font-family="Arial, sans-serif" font-size="16px" padding-bottom="20px">
                    Caso queira doar um valor diferente, faça um pix utilizando a chave aleatória: 69d28ddb-5447-44ec-997a-71be04038409
                    </mj-text>
                    <mj-text font-family="Arial, sans-serif" font-size="16px">
                    Atenciosamente,<br/>Equipe FlixNext
                    </mj-text>
                </mj-column>
                </mj-section>
            
                <mj-section background-color="#f8f8f8">
                <mj-column>
                    <mj-text font-family="Arial, sans-serif" font-size="12px" color="#666" align="center">
                    Este é um email automático, por favor, não responda.
                    </mj-text>
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
        return html
    }

    generateProblemTemplate({ title, description, tmdbId, season, episode, email }: ProblemTemplateProps): string {
        const mjmlTemplate = `
        <mjml>
        <mj-head>
            <mj-preview>Notificação de Problema</mj-preview>
        </mj-head>
        <mj-body background-color="#2b2b2b">
            <mj-section background-color="#242424" padding="20px" border-radius="8px">
            <mj-column>
                <mj-text align="center" font-size="20px" color="#ffffff" background-color="#4CAF50" padding="10px">
                Notificação de Problema
                </mj-text>
                <mj-text font-size="16px" color="#ffffff">Problema:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${title}</mj-text>
                <mj-text font-size="16px" color="#ffffff">Descrição:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${description}</mj-text>
                <mj-text font-size="16px" color="#ffffff">Id do título:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${tmdbId}</mj-text>
                <mj-text font-size="16px" color="#ffffff">Temporada:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${season ? season : 'não é uma série'}</mj-text>
                <mj-text font-size="16px" color="#ffffff">Episódio:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${episode ? episode : 'não é uma série'}</mj-text>
                <mj-text font-size="16px" color="#ffffff">ID do usuário:</mj-text>
                <mj-text font-size="14px" color="#ffffff">${email}</mj-text>
                <mj-divider border-color="#dddddd" />
                <mj-text color="#ffffff">Este é um email gerado automaticamente. Por favor, não responda.</mj-text>
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

    generatePromotionalTemplate(name: string): string {
        const mjmlTemplate = `
            <mjml>
            <mj-head>
                <mj-preview>Novembro Azul 💙 Confira histórias inspiradoras sobre saúde e superação</mj-preview>
                <mj-style inline="inline">
                a { color: #1d69f8ff; text-decoration: none; }
                </mj-style>
            </mj-head>
            
            <mj-body background-color="#121212">
                <mj-section background-color="#1f1f1f" padding="20px">
                <mj-column>
                    <mj-text align="center" color="#fff" font-size="24px" font-weight="bold">Novembro Azul 💙</mj-text>
                    <mj-image border-radius="16px" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIF.5bmyOrjAF%252f4Z0oBE%252bdVbOA%26cb%3Ducfimgc2%26pid%3DApi&f=1&ipt=b5c779ad9693f6799dc450e201caceb7eb40c18b1b9be5a3b6646fd4515b3769&ipo=images" />
                </mj-column>
                </mj-section>
            
                <mj-section background-color="#101010" border-radius="8px" padding="20px">
                <mj-column>
                    <mj-text color="#d3d3d3" font-size="20px" font-weight="bold">Olá, <strong>${name}</strong>!</mj-text>
                    <mj-text color="#d3d3d3" font-size="18px" align="center">
                    Novembro é o mês da conscientização sobre a saúde do homem. 💪  
                    Para entrar no clima, selecionamos filmes e séries que inspiram reflexão, superação e um pouco de adrenalina.
                    </mj-text>
                </mj-column>
                </mj-section>
            
                <mj-section>
                    <mj-column>
                        <mj-text font-size="20px" font-weight="bold" color="#d3d3d3">Séries para maratonar:</mj-text>
                    </mj-column>
                </mj-section>

                <mj-section padding="5px">
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/hGwm9Cj3CdbJIqQWNExQqiYmCd4.jpg" href="${this.webLink}/series/serie/1396" />
                    </mj-column>
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/tAJYUFaWot3jn5vtDUoxNNIw9aF.jpg" href="${this.webLink}/series/serie/136315" />
                    </mj-column>
                </mj-section>

                <mj-section padding="5px">
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/c9JwFbaBWarL9fwo1NSqsiTj7Zh.jpg" href="${this.webLink}/series/serie/108978" />
                    </mj-column>
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/29myVHhdGoS735ZJ9hblY0pQ3K9.jpg" href="${this.webLink}/series/serie/95557" />
                    </mj-column>
                </mj-section>

                <mj-section>
                    <mj-column>
                        <mj-button background-color="#921d1d" href="${this.webLink}/series">Ver mais</mj-button>
                    </mj-column>
                </mj-section>

                <mj-section>
                    <mj-column>
                        <mj-text font-size="20px" font-weight="bold" color="#d3d3d3">Filmes para assistir:</mj-text>
                    </mj-column>
                </mj-section>

                <mj-section padding="5px">
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg" href="${this.webLink}/movie/550" />
                    </mj-column>
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/vHGC2sSh7pBWXY0qzMdPD7fcjzS.jpg" href="${this.webLink}/movie/1402" />
                    </mj-column>
                </mj-section>

                <mj-section padding="5px">
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/bE6XutmB6tcvzTHBx4JGJLlzouM.jpg" href="${this.webLink}/movie/458156" />
                    </mj-column>
                    <mj-column padding="2px">
                        <mj-image  border-radius="16px" padding="2px" src="https://image.tmdb.org/t/p/w500/t8L9dqNMclXJHP0TesPsPS2RvB1.jpg" href="${this.webLink}/movie/359724" />
                    </mj-column>
                </mj-section>

                <mj-section>
                    <mj-column>
                        <mj-button background-color="#921d1d" href="${this.webLink}/#filmes">Ver mais</mj-button>
                    </mj-column>
                </mj-section>

                
                
                <mj-section background-color="#101010" padding="20px">
                <mj-column>
                    <mj-text color="#ccc" font-size="16px" align="center">
                    Lembre-se: cuidar da saúde é um ato de coragem.  
                    Faça seus exames regularmente e incentive quem você ama a fazer o mesmo.
                    </mj-text>
                    <mj-text color="#ccc" font-size="14px" align="center">A FlixNext recomenda histórias que inspiram autoconhecimento e bem-estar. Se você não quiser mais receber nossos emails, modifique as configurações da sua conta <a href="${this.webLink}/me">aqui</a>.</mj-text>
                    <mj-text color="#ccc" font-size="14px" align="center">©2025 FlixNext - mensagens automáticas, não responda a este e-mail.</mj-text>
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

    generateRequestTemplate(data: RequestProps): string {
        const mjmlTemplate = `
            <mjml>
            <mj-head>
                <mj-preview>Solicitação de Conteúdo</mj-preview>
            </mj-head>
            <mj-body background-color="#2b2b2b">
                <mj-section>
                <mj-column>
                    <mj-text align="center" font-size="22px" color="#fff" font-family="Arial">Solicitação de Conteúdo</mj-text>
                </mj-column>
                </mj-section>
                <mj-section background-color="#242424" border-radius="8px" padding="20px">
                <mj-column>
                    <mj-text font-size="16px" color="#fff" font-family="Arial">TMDBID:</mj-text>
                    <mj-text font-size="14px" font-family="Arial" color="#fff">${data.tmdbId}</mj-text>
                    <mj-text font-size="16px" color="#fff" font-family="Arial">Título:</mj-text>
                    <mj-text font-size="14px" font-family="Arial" color="#fff">${data.title}</mj-text>
                    <mj-text font-size="16px" color="#fff" font-family="Arial">SubTítulo:</mj-text>
                    <mj-text font-size="14px" font-family="Arial" color="#fff">${data.subtitle ?? "-"}</mj-text>
                    <mj-text font-size="16px" color="#fff" font-family="Arial">ID do Usuário:</mj-text>
                    <mj-text font-size="14px" font-family="Arial" color="#fff">${data.email}</mj-text>
                    <mj-text font-size="16px" color="#fff" font-family="Arial">Nome do Usuário:</mj-text>
                    <mj-text font-size="14px" font-family="Arial" color="#fff">${data.userName}</mj-text>
                </mj-column>
                </mj-section>
                <mj-section>
                <mj-column>
                    <mj-text font-size="12px" color="#999" align="center">
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

    /**Alterar logica para receber o qrcode no controller e no service, e remover do gerador de template*/
    generateRecoverTemplate(userName: string, token: string) {

        const RecoverLink = `${this.webLink}/recover?token=${token}`
        const qrCode = "data:image/png;base64,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";
        const base64 = qrCode.replace(/^data:image\/\w+;base64,/, '')
        const buffer = Buffer.from(base64, 'base64')

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
                    <mj-text font-size="16px" font-family="Arial">${RecoverLink}</mj-text>
                    <mj-text font-size="16px" font-family="Arial">Torne-se um apoiador! Faça uma doação para o projeto. Utilize o QRCode abaixo.</mj-text>
                    
                    <mj-image width="150px" src="cid:qrcode@pix" alt="69d28ddb-5447-44ec-997a-71be04038409" padding="10px" />
                    
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
        return { html, buffer }

    }

    generateEmailInfo(userName: string): string {
        const mjmlTemplate = `
                <mjml>
            <mj-head>
                <mj-preview>Mudamos de Endereço</mj-preview>
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
                    Alcançamos a marca de mais 800 filmes e 150 séries.
                    </mj-text>
                    <mj-text font-size="20px" color="#ffffff" font-family="Arial, sans-serif">
                    Continue utilizando nossos serviços.
                    </mj-text>
                    <mj-text font-size="20px" color="#ffffff" font-family="Arial, sans-serif">
                    Caso esteja tendo problemas com o acesso ou ativação da conta, entre em contato conosco através do nosso email de suporte: suporte@flixnext.com.br
                    </mj-text>
                    
                    <mj-button href="${this.webLink}" background-color="#f44336" color="#ffffff" font-size="18px" font-weight="700" padding="15px 30px">
                    flixnext.com.br
                    </mj-button>
                    <mj-text font-size="20px" color="#d3d3d3" font-family="Arial, sans-serif" >
                    Salve nosso site nos favoritos e se mantenha alerta para proximas novidades!
                    </mj-text>
                </mj-column>
                </mj-section>

                <mj-section padding="20px">
                <mj-column>
                    <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
                    <strong>Busque entre centenas de filmes e séries no nosso catálogo.</strong> Acesse a página de Catálogo completo da nossa plataforma para conferir a lista dos títulos disponíveis na plataforma: 
                    <a href="${this.webLink}/catalogo" style="color: #ffffff; text-decoration: none; font-weight: 700;">página do catálogo</a>
                    </mj-text>
                    <mj-text font-size="14px" color="#ccc" font-family="Arial, sans-serif">
                    A FlixNext envia e-mails informativos sobre filmes e séries que possam lhe interessar.
                    Se você não quiser mais receber nossos emails, modifique as configurações da sua conta
                    <a href="$${this.webLink}/me" target="_blank" style="color: #f44336; text-decoration: none;">aqui</a>.
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
}