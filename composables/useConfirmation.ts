import ConfirmationModal from "~/components/ConfirmationModal.vue";

export function useConfirmation(options: {
  title?: string;
  description: string;
}) {
  return new Promise((resolve) => {
    const overlay = useOverlay();

    const modal = overlay.create(ConfirmationModal);

    modal.open({
      title: options.title,
      description: options.description,
      onConfirm: async () => {
        modal.close();

        resolve(true);
      },
      onCancel: async () => {
        modal.close();

        resolve(false);
      },
    });
  });
}
