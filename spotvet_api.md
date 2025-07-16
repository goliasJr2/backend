
# 📘 SpotVet API Documentation

Plataforma para localizar e cadastrar serviços veterinários.

## 🔐 Autenticação

### `POST /auth/signup` - Criar conta de usuário

**Body:**
```json
{
  "nome": "VetMoz",
  "email": "vet@moz.com",
  "senha": "123456",
  "tipo": "CLINICA",
  "cidade": "Maputo",
  "provincia": "Central",
  "latitude": -25.95,
  "longitude": 32.58,
  "telefone": "823456789"
}
```

**Resposta:**
```json
{
  "usuario": { "id": "...", "email": "...", "tipo": "CLINICA", "slug": "vetmoz" },
  "token": "JWT..."
}
```

---

### `POST /auth/signin` - Login

**Body:**
```json
{
  "email": "vet@moz.com",
  "senha": "123456"
}
```

**Resposta:**
```json
{
  "usuario": { "id": "...", "tipo": "CLINICA", "slug": "vetmoz" },
  "token": "JWT..."
}
```

---

## 👤 Usuário

### `PUT /usuario/editar` - Atualizar dados básicos

**Header:** `Authorization: Bearer {token}`

**Body parcial:**
```json
{
  "nome": "Clínica Vet Atualizada",
  "cidade": "Matola"
}
```

---

### `PUT /usuario/editar-extensao` - Atualizar dados da extensão

**Header:** `Authorization: Bearer {token}`

**Body:**
```json
{
  "descricao": "Nova descrição da clínica"
}
```

---

## 📍 Serviços

### `GET /servicos/proximos?lat={lat}&lng={lng}&tipo={tipo?}` - Buscar serviços próximos

**Exemplo:**
```
/servicos/proximos?lat=-25.95&lng=32.58&tipo=CLINICA
```

**Resposta:**
```json
[
  {
    "nome": "Vet do Bairro",
    "tipo": "CLINICA",
    "distancia": 3.4,
    "clinica": {
      "descricao": "Clínica 24h"
    }
  }
]
```

---

### `GET /servicos/:slug` - Detalhes do serviço

**Exemplo:**
```
/servicos/vetmoz
```

**Resposta:**
```json
{
  "nome": "VetMoz",
  "tipo": "CLINICA",
  "slug": "vetmoz",
  "clinica": {
    "descricao": "Clínica moderna e equipada"
  }
}
```

---

## 📤 Upload de imagem (planejado)

### `PUT /usuario/upload-foto`

> Protegido com token. Envia imagem de perfil (`multipart/form-data`).

---

## 📚 Enum: TipoUsuario

```ts
enum TipoUsuario {
  VETERINARIO
  PRODUTOR
  CLINICA
  PETSHOP
  FARMACIA
  LOJA_RACAO
}
```
