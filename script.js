$(document).ready(function() {
    $("#celular").mask("(00) 00000-0000");

    $("#email").on("input", function() {
        const value = $(this).val();
        if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert("Insira um E-mail válido!")
        }
        
    });

    $("#form-funcionario").on("submit", function(event) {
        event.preventDefault(); 

        let isValid = true;

        $("#form-funcionario input, #form-funcionario select").each(function() {
            if ($(this).is("select") && $(this).val() === "Selecione") {
                isValid = false;
                alert("Selecione uma opção válida em " + $(this).attr("name") + ".");
                return false;
            } else if ($(this).val() === "") {
                isValid = false;
                alert("O campo " + $(this).attr("name") + " é obrigatório.");
                return false;
            }
        });

        const emailValue = $("#email").val();
        if (emailValue && !emailValue.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            isValid = false;
            alert("Insira um E-mail válido.");
        }

        if (isValid) {
            alert("Formulário enviado com sucesso!");
            this.submit();
        }
    });
});
