import axios from "axios";

export async function getAllApps() {
  const res = await axios("https://api.npoint.io/4ca5aaf459a573940672");
  return await res;
}

export async function getAllStats() {
  const res = await axios("https://api.npoint.io/d734975d2aee62d197ef");
  return await res;
}
