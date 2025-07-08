<script setup lang="ts">
import { useSession } from "~/store/session";
import { NewStreamerModal } from "#components";

const session = useSession();

definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div className="max-w-7xl mx-auto py-24">
    <div className="mb-12">
      <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
        Welcome back
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Ready to automate your streaming clips?
      </p>

      <div
        className="inline-flex items-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg px-6 py-3"
      >
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
        <span className="text-gray-300 text-sm">App ID:</span>
        <span className="font-mono text-blue-400 font-medium">
          {{ session.appId }}
        </span>
      </div>
    </div>

    <div className="grid grid-cols-6 grid-rows-3 gap-4 h-96 mb-12">
      <NewStreamerModal>
        <DashboardPanel
          class="col-span-2 row-span-2"
          title="Add Streamer"
          icon-placement="top"
          icon="i-lucide-plus"
          description="Connect a new streamer and start generating clips automatically"
          color="blue"
        />
      </NewStreamerModal>

      <ManageStreamersModal>
        <DashboardPanel
          class="col-span-2 row-span-1"
          title="Manage Streamers"
          icon-placement="side"
          icon="i-lucide-person-standing"
          description="View & manage all streamers currently being recorded"
          color="purple"
        />
      </ManageStreamersModal>
    </div>
  </div>
</template>
