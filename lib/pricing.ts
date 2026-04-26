import { DesignDraft } from "@/lib/types";

const UNIT_PRICE_ARS = 200;

export function getUnitPrice(draft: DesignDraft) {
  void draft;
  return UNIT_PRICE_ARS;
}

export function getTotalPrice(draft: DesignDraft) {
  return getUnitPrice(draft) * draft.quantity;
}
