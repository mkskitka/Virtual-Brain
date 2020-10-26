

var DIR = 'dir';
var FILE = 'file';

export const dirStructure =
 {
        Conscious: {
                name: 'Conscious',
                type: DIR,
                contents: {
                    projects: {
                        name: 'projects',
                        type: DIR,
                        contents: {
                            demo: {
                                name: 'demo.exe',
                                type: FILE,
                            },
                            astropunk: {
                                name: 'astropunk.exe',
                                type: FILE,
                            },
                            violin_crescendo: {
                                name: 'violin_crescendo.exe',
                                type: FILE,
                            },
                            animation: {
                                name: 'animation.exe',
                                type: FILE,
                            },
                            pac_man: {
                                name: 'pac_man.exe',
                                type: FILE,
                            },
                            creature: {
                                name: 'creature.exe',
                                type: FILE,
                            },
                            mental: {
                                name: 'mental_health.exe',
                                type: FILE,
                            },
                            lobbyview: {
                                name: 'lobbyview.exe',
                                type: FILE,
                            },
                        }
                    },
                    about: {
                        name: 'about.exe',
                        type: FILE,
                    }
                }
        },
        notaccessible: {
            name: 'Subconscious',
            type: DIR,
            contents: {},
        }
 }

