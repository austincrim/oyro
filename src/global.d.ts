/// <reference types="@sveltejs/kit" />

declare var Plaid: PlaidLink

type PlaidLink = {
  create: (opts: CreateParams) => LinkHandler
}

type CreateParams = {
  token: string
  onSuccess?: (public_token: string, metadata: any) => void
}

type LinkHandler = {
  open: () => void
}
