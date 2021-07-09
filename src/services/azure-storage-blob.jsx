import { BlobServiceClient, ContainerClient} from '@azure/storage-blob';

// const sasToken = process.env.SVG_SAS || ""; // Fill string with your SAS token
// const containerName = process.env.SVG_CONTAINER;
// const storageAccountName = process.env.STORAGE_ACCOUNT_NAME || ""; // Fill string with your Storage resource name
// const sasToken = "sp=racwl&st=2021-07-07T08:36:50Z&se=2022-01-01T16:36:50Z&sv=2020-02-10&sr=c&sig=3SuEQ04Ft9pMAPBUZXPDjfhJ56U6%2F9APqbyNhD4Ykl0%3D"; // Fill string with your SAS token
const containerName = "svg";
const storageAccountName = "reactjsimagelib"; // Fill string with your Storage resource name
const sasToken = "sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacuptfx&se=2022-06-01T17:38:50Z&st=2021-07-07T09:38:50Z&spr=https,http&sig=L0PtBNlbxfJIXkvEc52DQ4co59vKomURBq8wl%2B75krg%3D"

export const isStorageConfigured = () => {
  // console.log('InHere', sasToken, containerName, storageAccountName);
  return (!storageAccountName || !sasToken) ? false : true;
}

export const getBlobImageContainer = () => {
   // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
   const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  
  // get Container - full public read access
  const containerClient: ContainerClient = blobService.getContainerClient(containerName);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
}

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient: ContainerClient) => {
  const returnedBlobUrls: string[] = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${storageAccountName}.blob.core.windows.net/${containerName}/${blob.name}`
    );
  }

  return returnedBlobUrls;
}

const createBlobInContainer = async (containerClient: ContainerClient, file: File) => {
  
  // create blobClient for container
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = { blobHTTPHeaders: { blobContentType: file.type } };

  // upload file
  await blobClient.uploadBrowserData(file, options);
}

const uploadFileToBlob = async (file: File | null): Promise<string[]> => {
  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(
    `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
  );

  
  // get Container - full public read access
  const containerClient: ContainerClient = blobService.getContainerClient(containerName);
  await containerClient.createIfNotExists({
    access: 'container',
  });

  // upload file
  await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  return getBlobsInContainer(containerClient);
};

export default uploadFileToBlob;