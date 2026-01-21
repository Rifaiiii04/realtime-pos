import {
  INITIAL_CREATE_USER_FORM,
  INITIAL_STATE_CREATE_USER,
  INITIAL_STATE_UPDATE_USER,
} from "@/constants/auth-constant";
import {
  UpdateUserForm,
  updateUserSchema,
} from "@/validations/auth-validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createUser, updateUser } from "../action";
import { Preview } from "@/types/general";
import FormUser from "./form-user";
import { Profile } from "@/types/auth";
import { Key } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/auth-store";

export default function DialogUpdateUser({
  refetch,
  currentData,
  handleChangeAction,
  open,
}: {
  refetch: () => void;
  currentData?: Profile;
  open?: boolean;
  handleChangeAction?: (open: boolean) => void;
}) {
  const form = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    if (currentData?.avatar_url !== data.avatar_url) {
      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key,
          key === "avatar_url" ? (preview!.file ?? "") : value,
        );
      });
      formData.append("old_avatar_url", currentData?.avatar_url ?? "");
    } else {
      Object.entries(data).forEach(([Key, value]) => {
        formData.append(Key, value);
      });
    }

    formData.append("id", currentData?.id ?? "");

    startTransition(() => {
      updateUserAction(formData);
    });
  });

  const [updateUserState, updateUserAction, isPendingUpdateUser] =
    useActionState(updateUser, INITIAL_STATE_UPDATE_USER);

  const [preview, setPreview] = useState<Preview | undefined>(undefined);

  useEffect(() => {
    if (updateUserState?.status === "error") {
      toast.error("Update user Failed", {
        description: updateUserState.errors?._form?.[0],
      });
    }
    if (updateUserState?.status === "success") {
      toast.success("Update User Success");
      form.reset();
      handleChangeAction?.(false);
      refetch();
    }
  }, [updateUserState]);

  useEffect(() => {
    if (currentData) {
      form.setValue("name", currentData.name as string);
      form.setValue("role", currentData.role as string);
      form.setValue("avatar_url", currentData.avatar_url as string);
      setPreview({
        file: new File([], currentData.avatar_url as string),
        displayUrl: currentData.avatar_url as string,
      });
    }
  }, [currentData]);

  return (
    <Dialog open={open} onOpenChange={handleChangeAction}>
      <FormUser
        form={form}
        onSubmit={onSubmit}
        isLoading={isPendingUpdateUser}
        type="Update"
        preview={preview}
        setPreview={setPreview}
      />
    </Dialog>
  );
}
