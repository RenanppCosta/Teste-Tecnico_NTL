$(document).ready(function() {
    $("#celular").mask("(00) 00000-0000");

    $("#email").on("blur", function() {
        const value = $(this).val();
        if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
            alert("Insira um E-mail válido!")
        }
        
    });

    $("#form-funcionario").on("submit", function(event) {
        event.preventDefault(); 

        let isValid = true;
        let celular = $("#celular").val();
        celular = celular.replace(/\D/g, "");

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

        if(celular.length !== 11){
            isValid = false
            alert("Digite um número de celular válido.")
        }

        if (isValid) {
            $.ajax({
                url: "http://127.0.0.1:3000/cadastrar",
                type: "POST",
                data: $("#form-funcionario").serialize(),
                success: function() {
                    alert("Funcionário cadastrado com sucesso!");
                    $("#form-funcionario")[0].reset();
                },
                error: function() {
                    alert("Erro ao cadastrar funcionário. Tente novamente.");
                }
            });
        }
    });
});
