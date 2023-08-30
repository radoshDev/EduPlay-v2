<template>
  <div className="h-screen">
    <div className="container mx-auto flex h-full flex-col p-4">
      <slot name="title"></slot>
      <div className="flex min-h-0 flex-1 justify-center pt-6">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
