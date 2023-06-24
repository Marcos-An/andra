export interface operationalListItemsType {
  idLista: number;
  nmNatOperacao: string;
  tpEstoque: number;
  tpFinanceiro: number;
}

export interface operationItemType {
  id: number;
  nmNatOperacao: string;
  tpEstoque: string;
  alias_tpEstoque: string;
  tpFinanceiro: string;
  alias_tpFinanceiro: string;
  dhCadastrou: string;
  idUsuarioCadastrou: 0;
  alias_usuarioCadastrou: string | null;
  dhAlterou: string | null;
  idUsuarioAlterou: string | null;
  alias_usuarioAlterou: string | null;
  dhExcluiu: string | null;
  idUsuarioExcluiu: string | null;
  alias_usuarioExcluiu: string | null;
  alias_excluido: string;
}
